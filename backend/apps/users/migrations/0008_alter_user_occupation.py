# Generated by Django 5.1.3 on 2024-12-01 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_user_groups_alter_user_user_permissions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='occupation',
            field=models.CharField(blank=True, choices=[('1st AC', '1st AC'), ('3D Modeler', '3D Modeler'), ('Animator', 'Animator'), ('Cameraman', 'Cameraman'), ('Character Artist', 'Character Artist'), ('Compositor', 'Compositor'), ('Concept Artist', 'Concept Artist'), ('DoP', 'DoP'), ('Environment Artist', 'Environment Artist'), ('Lighting Artist', 'Lighting Artist'), ('On-set supervisor', 'On-set supervisor'), ('VFX Artist', 'VFX Artist'), ('VFX supervisor', 'VFX supervisor'), ('Other', 'Other')], default='', max_length=50, null=True, verbose_name='Профессия'),
        ),
    ]
