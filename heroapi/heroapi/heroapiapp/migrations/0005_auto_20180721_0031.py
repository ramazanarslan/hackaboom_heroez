# Generated by Django 2.0.7 on 2018-07-20 21:31

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('heroapiapp', '0004_remove_cloth_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cloth',
            name='image',
            field=models.ImageField(upload_to='cloth_images/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'gif', 'png'])]),
        ),
    ]
