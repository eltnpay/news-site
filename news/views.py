from django.shortcuts import render, redirect
from django.contrib.auth import login,logout
from django.shortcuts import render,get_object_or_404
from .forms import RegistrationForm, LoginForm, ReviewForm, Comments
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
    comments = Comments.objects.filter(news=new)

    if request.method == 'POST':
        if not request.user.is_authenticated:
            return redirect('login')

        forms = ReviewForm(request.POST)
        if forms.is_valid():
            comment = forms.save(commit=False)
            comment.user = request.user
            comment.news = new
            comment.save()
            return redirect('news_detail', news_id=new.id)
    else:
        forms = ReviewForm()

    context = {
        'new': new,
        'comments': comments,
        'forms': forms
    }

    return render(request, 'news/news_detail.html', context)


