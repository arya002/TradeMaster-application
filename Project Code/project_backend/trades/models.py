from django.db import models
from django.utils.translation import gettext_lazy as _


class Client(models.Model):

    clientId = models.CharField(max_length=30)
    entityId = models.CharField(max_length=30)

    LEI = models.BooleanField(default=False)
    REPORTING_CONSENT = models.BooleanField(default=False)
    AML_KYC = models.BooleanField(default=False)

    isGTT = models.BooleanField(default=False)

    class Meta:
        unique_together = ['clientId', 'entityId']
        indexes = [
        models.Index(fields=['clientId', 'entityId',]),
    ]

    def __str__(self):
        return str(self.clientId + " | " + self.entityId)

class Trade(models.Model):

    client = models.ForeignKey(Client, on_delete=models.CASCADE, default=None)

    date = models.DateField(default=None)
    tradeID = models.CharField(primary_key=True, max_length=30)
    reportingSide = models.CharField(max_length=30)
    regulation = models.CharField(max_length=30)
    jurisdiction = models.CharField(max_length=10)
    securitiesFinancingTransactionType = models.CharField(max_length=20)

    class Meta:
        indexes = [
        models.Index(fields=['regulation', 'jurisdiction', 'securitiesFinancingTransactionType', 'reportingSide']),
    ]

    def __str__(self):
        return self.tradeID

class Regulation(models.Model):

    allowedRegulation = models.CharField(max_length=20)

    def __str__(self):
        return self.allowedRegulation

class Jurisdiction(models.Model):

    allowedJurisdiction = models.CharField(max_length=10)

    def __str__(self):
        return self.allowedJurisdiction

class SecuritiesType(models.Model):

    allowedSecuritiesType = models.CharField(max_length=20)

    def __str__(self):
        return self.allowedSecuritiesType

class ReportingSide(models.Model):

    allowedReportingSide = models.CharField(max_length=10)

    def __str__(self):
        return self.allowedReportingSide

class ReportingCounterParty(models.Model):

    allowedReportingCounterParty = models.CharField(max_length=10)

    def __str__(self):
        return self.allowedReportingCounterParty
