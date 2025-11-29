from django import forms
from .models import Comments
from django.contrib.auth.forms import AuthenticationForm,UserCreationForm,UserChangeForm
from django.contrib.auth.models import User

class RegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username','password1','password2']

class LoginForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ['username','password']

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Comments
        fields = ['text']
        


