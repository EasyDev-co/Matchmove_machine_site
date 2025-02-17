from django import template

register = template.Library()

@register.filter(name='instanceof')
def instanceof(value, class_name):
    """
    Проверяет, является ли реальный класс value именем class_name.
    Например, value.get_real_instance_class().__name__ == 'TextBlock'
    """
    try:
        return value.get_real_instance_class().__name__ == class_name
    except AttributeError:
        return False
