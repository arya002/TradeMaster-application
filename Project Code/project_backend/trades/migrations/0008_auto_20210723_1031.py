# Generated by Django 3.0.5 on 2021-07-23 10:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('trades', '0007_auto_20210723_1021'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trade',
            name='counterpartyID',
        ),
        migrations.RemoveField(
            model_name='trade',
            name='reportingCounterpartyID',
        ),
        migrations.AddField(
            model_name='client',
            name='clientId',
            field=models.CharField(default=1, max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='client',
            name='entityId',
            field=models.CharField(default=1, max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='trade',
            name='client',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, to='trades.Client'),
        ),
        migrations.AlterUniqueTogether(
            name='client',
            unique_together={('clientId', 'entityId')},
        ),
        migrations.RemoveField(
            model_name='client',
            name='TradingParties',
        ),
        migrations.DeleteModel(
            name='TradeParties',
        ),
    ]