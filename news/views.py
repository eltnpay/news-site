from django.shortcuts import render, redirect
from django.contrib.auth import login,logout
from django.shortcuts import render,get_object_or_404
from .forms import RegistrationForm, LoginForm, ReviewForm
from .models import News

def homepage(request):
    news = News.objects.all()
    return render(request, 'news/home.html',{'news': news})

def registration(request):
    form = RegistrationForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')

    return render(request, 'news/reg.html', {'form': form})


def user_login(request):
    form = LoginForm(data=request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')

    return render(request, 'news/login.html', {'form': form})


def log_out(request):
    logout(request)
    return redirect('home')



def news_detail(request, news_id):
    new = get_object_or_404(News, id=news_id)

    return render(request, 'news/news_detail.html', {'new': new})
