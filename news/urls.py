from django.urls import path
from .views import registration, homepage, news_detail, user_login, log_out

urlpatterns = [
    path('', homepage, name='home'),
    path('reg/', registration, name='regis'),
    path('login/', user_login, name='login'),
    path('logout/',log_out, name='logout'),
    path('news/<int:news_id>/', news_detail, name='news_detail'),
]


