# Generated by Django 3.0.5 on 2021-07-23 10:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('trades', '0010_auto_20210723_1042'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trade',
            name='client',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='trades.Client'),
        ),
    ]
