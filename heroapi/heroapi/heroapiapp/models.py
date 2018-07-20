from django.db import models
from django.core.validators import FileExtensionValidator


CLOTH_TYPES = (
    ('GE', 'General'),
    ('SH', 'Short'),
    ('TE', 'T-Shirt'),
    ('PA', 'Pants'),
    ('SO', 'Socks'),
    ('UN', 'Underwear'),
    ('HO', 'Shoes'),
    ('SR', 'Shirts'),
)


class Shop(models.Model):
    name = models.CharField(max_length=100)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    long = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.name


class Cloth(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='cloth_images/', validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'gif', 'png'])])
    xxl = models.BooleanField()
    #description = models.CharField(max_length=500)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    cloth_type = models.CharField(choices=CLOTH_TYPES, max_length=2, default='GE')

    def __str__(self):
        return '{} ({})'.format(self.title, self.cloth_type)


class Sound(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    sound = models.FileField(upload_to='sounds/')

    def __str__(self):
        return '{} - {}'.format(self.title, self.artist)