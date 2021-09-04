from django.contrib import admin
from .models import Trade, Client, Regulation, Jurisdiction, SecuritiesType, ReportingSide, ReportingCounterParty

admin.site.register(Trade)
admin.site.register(Client)

admin.site.register(Regulation)
admin.site.register(Jurisdiction)
admin.site.register(SecuritiesType)
admin.site.register(ReportingSide)
admin.site.register(ReportingCounterParty)