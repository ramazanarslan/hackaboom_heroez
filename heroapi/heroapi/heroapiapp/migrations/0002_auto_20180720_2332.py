# Generated by Django 2.0.7 on 2018-07-20 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('heroapiapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='lat',
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
        migrations.AlterField(
            model_name='shop',
            name='long',
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
    ]
