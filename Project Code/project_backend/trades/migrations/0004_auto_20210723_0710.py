# Generated by Django 3.0.5 on 2021-07-23 07:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trades', '0003_auto_20210722_0647'),
    ]

    operations = [
        migrations.RenameField(
            model_name='client',
            old_name='entityId',
            new_name='entityID',
        ),
        migrations.AlterUniqueTogether(
            name='client',
            unique_together={('clientID', 'entityID')},
        ),
    ]
