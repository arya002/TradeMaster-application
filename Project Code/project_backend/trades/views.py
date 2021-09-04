from os import error
from django.http import response
from django.http.response import JsonResponse
from django.shortcuts import render, HttpResponse, redirect
from django.http import HttpResponse
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
import json
import datetime
from datetime import date, datetime, timedelta
from .models import Trade, Client, Regulation, Jurisdiction, SecuritiesType, ReportingCounterParty, ReportingSide
from django.db.models import Q
from datetime import datetime

def index(request):
    return HttpResponse("Index trades")

@csrf_exempt
def get_by_date(request):

    if(request.method=="GET"):

        query_date = request.GET.get("date")

        regulations = list(Regulation.objects.all().values())
        reportingSides = list(ReportingSide.objects.all().values())
        jurisdictions = [i["allowedJurisdiction"] for i in list(Jurisdiction.objects.all().values())]
        securitiesTypes = [i["allowedSecuritiesType"] for i in list(SecuritiesType.objects.all().values())]
        reportingCounterParties = [i["allowedReportingCounterParty"] for i in list(ReportingCounterParty.objects.all().values())]

        # making query set
        clients = Trade.objects.filter(date=query_date)

        for i in regulations:
            clients = clients.filter(regulation=i["allowedRegulation"])
        for i in reportingSides:
            clients = clients.filter(reportingSide=i["allowedReportingSide"])
        
        clients = clients.filter(jurisdiction__in=jurisdictions)
        
        clients = clients.filter(securitiesFinancingTransactionType__in=securitiesTypes)
        
        clients = clients.filter(client__entityId__in=reportingCounterParties)

        clients = clients.filter(client__isGTT=False)

        # clients = clients.filter(reportingSide="FIRM")
        # clients = clients.filter(regulation="SFT_REPORTING")
        # clients = clients.filter(Q(jurisdiction="UK") | Q(jurisdiction="EU"))
        # clients = clients.filter(Q(securitiesFinancingTransactionType="SECURITIES_LENDING") | Q(securitiesFinancingTransactionType="REPURCHASE") | Q(securitiesFinancingTransactionType="MARGIN_LENDING") | Q(securitiesFinancingTransactionType="BUY_BACK"))
        # clients = clients.filter(Q(client__entityId="FNB-UK") | Q(client__entityId="FNB-EU"))
        
        
        clients = clients.order_by('client')
        clients = clients.values('client__clientId', 'client__entityId', 'client__LEI', 'client__REPORTING_CONSENT', 'client__AML_KYC', 'tradeID')
        clients_list = list(clients)

        client_dict = dict()
        for c in clients_list:
            key = c["client__clientId"] + '@' + c["client__entityId"]
            if client_dict.get(key) == None:
                client_dict[key] = {"docs": [], "trades": [c["tradeID"]]}
                client_dict[key]["client"] = c["client__clientId"]
                client_dict[key]["entity"] = c["client__entityId"]
                client_dict[key]["id"] = key

                if not c["client__LEI"]:
                    client_dict[key]["docs"].append("LEI")
                if not c["client__REPORTING_CONSENT"]:
                    client_dict[key]["docs"].append("REPORTING_CONSENT")
                if not c["client__AML_KYC"]:
                    client_dict[key]["docs"].append("AML_KYC")
            else:
                client_dict[key]["trades"].append(c["tradeID"])

        JsonResponse.status_code = 200
        return JsonResponse(list(client_dict.values()), safe=False)

    else:
        HttpResponse.status_code = 500
        return HttpResponse()

@csrf_exempt
def get_by_trade(request):

    if(request.method=="GET"):

        query_tradeID = request.GET.get("tradeID")

        regulations = list(Regulation.objects.all().values())
        reportingSides = list(ReportingSide.objects.all().values())
        jurisdictions = [i["allowedJurisdiction"] for i in list(Jurisdiction.objects.all().values())]
        securitiesTypes = [i["allowedSecuritiesType"] for i in list(SecuritiesType.objects.all().values())]
        reportingCounterParties = [i["allowedReportingCounterParty"] for i in list(ReportingCounterParty.objects.all().values())]

        # making query set
        clients = Trade.objects.filter(tradeID__contains=query_tradeID)

        for i in regulations:
            clients = clients.filter(regulation=i["allowedRegulation"])
        for i in reportingSides:
            clients = clients.filter(reportingSide=i["allowedReportingSide"])
        
        clients = clients.filter(jurisdiction__in=jurisdictions)
        
        clients = clients.filter(securitiesFinancingTransactionType__in=securitiesTypes)
        
        clients = clients.filter(client__entityId__in=reportingCounterParties)
        
        clients = clients.values('client__clientId', 'client__entityId', 'client__LEI', 'client__REPORTING_CONSENT', 'client__AML_KYC', 'tradeID')
        clients_list = list(clients)

        client_dict = dict()
        for c in clients_list:
            key = c["client__clientId"] + '@' + c["client__entityId"]
            if client_dict.get(key) == None:
                client_dict[key] = {"docs": [], "trades": [c["tradeID"]]}
                client_dict[key]["client"] = c["client__clientId"]
                client_dict[key]["entity"] = c["client__entityId"]
                client_dict[key]["id"] = key

                if not c["client__LEI"]:
                    client_dict[key]["docs"].append("LEI")
                if not c["client__REPORTING_CONSENT"]:
                    client_dict[key]["docs"].append("REPORTING_CONSENT")
                if not c["client__AML_KYC"]:
                    client_dict[key]["docs"].append("AML_KYC")
            else:
                client_dict[key]["trades"].append(c["tradeID"])
        # for key in client_dict.keys():
        #     print(key, " ", client_dict[key])

        JsonResponse.status_code = 200
        return JsonResponse(list(client_dict.values()), safe=False)

    else:
        HttpResponse.status_code = 500
        return HttpResponse()

@csrf_exempt
def get_by_client(request):

    if(request.method=="GET"):

        query_clientId = request.GET.get("clientId")
        
        regulations = list(Regulation.objects.all().values())
        reportingSides = list(ReportingSide.objects.all().values())
        jurisdictions = [i["allowedJurisdiction"] for i in list(Jurisdiction.objects.all().values())]
        securitiesTypes = [i["allowedSecuritiesType"] for i in list(SecuritiesType.objects.all().values())]
        reportingCounterParties = [i["allowedReportingCounterParty"] for i in list(ReportingCounterParty.objects.all().values())]

        # making query set
        clients = Trade.objects.filter(client__clientId=query_clientId)

        for i in regulations:
            clients = clients.filter(regulation=i["allowedRegulation"])
        for i in reportingSides:
            clients = clients.filter(reportingSide=i["allowedReportingSide"])
        
        clients = clients.filter(jurisdiction__in=jurisdictions)
        
        clients = clients.filter(securitiesFinancingTransactionType__in=securitiesTypes)
        
        clients = clients.filter(client__entityId__in=reportingCounterParties)

        clients = clients.filter(client__isGTT=False)
        
        clients = clients.values('client__clientId', 'client__entityId', 'client__LEI', 'client__REPORTING_CONSENT', 'client__AML_KYC', 'tradeID')
        clients_list = list(clients)

        client_dict = dict()
        for c in clients_list:
            key = c["client__clientId"] + '@' + c["client__entityId"]
            if client_dict.get(key) == None:
                client_dict[key] = {"docs": [], "trades": [c["tradeID"]]}
                client_dict[key]["client"] = c["client__clientId"]
                client_dict[key]["entity"] = c["client__entityId"]
                client_dict[key]["id"] = key

                if not c["client__LEI"]:
                    client_dict[key]["docs"].append("LEI")
                if not c["client__REPORTING_CONSENT"]:
                    client_dict[key]["docs"].append("REPORTING_CONSENT")
                if not c["client__AML_KYC"]:
                    client_dict[key]["docs"].append("AML_KYC")
            else:
                client_dict[key]["trades"].append(c["tradeID"])
        # for key in client_dict.keys():
            # print(key, " ", client_dict[key])

        JsonResponse.status_code = 200
        return JsonResponse(list(client_dict.values()), safe=False)
    
    else:
        HttpResponse.status_code = 500
        return HttpResponse()

@csrf_exempt
def set_clients(request):
    """
    length of client file = 70 objects
    """

    if(request.method=="POST"):

        gtt_file = request.FILES.get('file')
        
        clientList = []

        for jsonObj in gtt_file:
            clientDict = json.loads(jsonObj)

            if "date" in clientDict:
                HttpResponse.status_code = 205
                return HttpResponse()

            clientList.append(clientDict)

        for client in clientList:
            
            client_name = next(iter(client))
            client_data = client[client_name]

            """
            saving docs for first entityId
            """

            new_client = Client()
            entity = client_data[0]['entityId']
            new_client.clientId = client_name
            new_client.entityId = entity
            for doc_info in client_data[:3]:
                
                if doc_info['documentId'] == 'LEI':
                    if doc_info['status'] == 'GREEN':
                        new_client.LEI = True
                    else:
                        new_client.LEI = False

                elif doc_info['documentId'] == 'REPORTING_CONSENT':
                    if doc_info['status'] == 'GREEN':
                        new_client.REPORTING_CONSENT = True
                    else:
                        new_client.REPORTING_CONSENT = False

                elif doc_info['documentId'] == 'AML_KYC':
                    if doc_info['status'] == 'GREEN':
                        new_client.AML_KYC = True
                    else:
                        new_client.AML_KYC = False

            new_client.isGTT = new_client.LEI and new_client.REPORTING_CONSENT and new_client.AML_KYC

            try:
                new_client.save()
            except Exception as e:
                try:
                    old_client = Client.objects.get(clientId = client_name, entityId = entity)
                    old_client.LEI = new_client.LEI
                    old_client.REPORTING_CONSENT = new_client.REPORTING_CONSENT
                    old_client.AML_KYC = new_client.AML_KYC
                    old_client.isGTT = old_client.LEI and old_client.REPORTING_CONSENT and old_client.AML_KYC
                    old_client.save()
                except Client.DoesNotExist as e:
                    pass

            """
            saving docs for second entityId
            """

            new_client_2 = Client()
            entity = client_data[3]['entityId']            
            new_client_2.clientId = client_name
            new_client_2.entityId = entity
            for doc_info in client_data[3:]:
                
                if doc_info['documentId'] == 'LEI':
                    if doc_info['status'] == 'GREEN':
                        new_client_2.LEI = True
                    else:
                        new_client_2.LEI = False
                
                elif doc_info['documentId'] == 'AML_KYC':
                    if doc_info['status'] == 'GREEN':
                        new_client_2.AML_KYC = True
                    else:
                        new_client_2.AML_KYC = False

                elif doc_info['documentId'] == 'REPORTING_CONSENT':
                    if doc_info['status'] == 'GREEN':
                        new_client_2.REPORTING_CONSENT = True
                    else:
                        new_client_2.REPORTING_CONSENT = False

            # additional flag to check if client is GTT
            new_client_2.isGTT = new_client_2.LEI and new_client_2.REPORTING_CONSENT and new_client_2.AML_KYC

            try:
                new_client_2.save()
            except Exception as e:
                try:
                    old_client = Client.objects.get(clientId = client_name, entityId = entity)
                    old_client.LEI = new_client_2.LEI
                    old_client.REPORTING_CONSENT = new_client_2.REPORTING_CONSENT
                    old_client.AML_KYC = new_client_2.AML_KYC
                    old_client.isGTT = old_client.LEI and old_client.REPORTING_CONSENT and old_client.AML_KYC
                    old_client.save()
                except Client.DoesNotExist as e:
                    pass

        HttpResponse.status_code = 200
        return HttpResponse()

    else:
        HttpResponse.status_code = 500
        return HttpResponse()

@csrf_exempt
def set_trades(request):
    """
    length of trade file = 30000 objects
    """

    if(request.method=="POST"):


        trade_file = request.FILES.get('file')

        tradeList = []

        for jsonObj in trade_file:
            tradeDict = json.loads(jsonObj)

            if not "date" in tradeDict:
                HttpResponse.status_code = 205
                return HttpResponse()

            tradeList.append(tradeDict)

        StoreList = []

        for trade in tradeList:
            
            try:
                new_trade = Trade()
                counterpartyID = trade['regulatoryReportingDetails']['counterpartyID']
                reportingCounterpartyID = trade['regulatoryReportingDetails']['reportingCounterpartyID']

                try:
                    trade_client = Client.objects.get(clientId=counterpartyID, entityId=reportingCounterpartyID)
                    new_trade.client = trade_client
                
                except Client.DoesNotExist as e:
                    trade_client = Client(clientId=counterpartyID, entityId=reportingCounterpartyID)
                    trade_client.save()
                    new_trade.client = trade_client

                dt = datetime.strptime(trade['date'], "%Y%m%d")

                # new_trade.counterpartyID = trade['regulatoryReportingDetails']['counterpartyID']
                # new_trade.reportingCounterpartyID = trade['regulatoryReportingDetails']['reportingCounterpartyID']
                new_trade.date = dt.strftime("%Y-%m-%d")
                new_trade.tradeID = trade['tradeID']
                new_trade.reportingSide = trade['reportingSide']
                new_trade.regulation = trade['regulation']
                new_trade.jurisdiction = trade['jurisdiction']
                new_trade.securitiesFinancingTransactionType = trade['securitiesFinancingTransactionType']

                StoreList.append(new_trade)

            except Exception as e:
                print("new trade error " + str(e))
                break

        try:
            Trade.objects.bulk_create(StoreList)
            
        except Exception as e:
            print("Store list " + str(e))

        HttpResponse.status_code = 200
        return HttpResponse()

    else:
        HttpResponse.status_code = 500
        return HttpResponse()

@csrf_exempt
def delete_trades(request):

    if(request.method=="POST"):

        Trade.objects.all().delete()

        HttpResponse.status_code = 200
        return HttpResponse()

    else:
        HttpResponse.status_code = 500
        return HttpResponse()

@csrf_exempt
def delete_clients(request):

    if(request.method=="POST"):

        Client.objects.all().delete()

        HttpResponse.status_code = 200
        return HttpResponse()

    else:
        HttpResponse.status_code = 500
        return HttpResponse()