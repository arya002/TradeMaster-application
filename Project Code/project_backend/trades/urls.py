from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path("",views.index,name="tradesHome"),
    path('get_by_date/',views.get_by_date,name='get_by_date'),
    path('get_by_trade/',views.get_by_trade,name='get_by_trade'),
    path('get_by_client/',views.get_by_client,name='get_by_client'),
    
    path('set_clients/',views.set_clients,name='set_clients'),
    path('set_trades/',views.set_trades,name='set_trades'),
    path('delete_trades/',views.delete_trades,name='delete_trades'),
    path('delete_clients/',views.delete_clients,name='delete_clients')
]