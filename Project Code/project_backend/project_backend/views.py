from django.shortcuts import render
from django.http import HttpResponse
def index(request):
    return HttpResponse('Server Started. Proceed to http://127.0.0.1:8001/admin/')
