from django.db import models
from django.contrib.auth.models import User

# Create your models here.


# Create your models here.
class Category(models.Model):
    category_name = models.CharField(max_length=150,
                                     verbose_name='Название категорий')

    def __str__(self):
        return self.category_name
    
    

class Images(models.Model):
    image=models.ImageField(upload_to='news/')

    def __str__(self):
        return self.image.name
    


class News(models.Model):
    title = models.CharField(max_length=250)
    text = models.TextField()
    published_time = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    image = models.ManyToManyField(Images)

    def __str__(self):
        return self.title
    

class Comments(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    news = models.ForeignKey(News,on_delete=models.CASCADE)

    def __str__(self):
        return self.text
