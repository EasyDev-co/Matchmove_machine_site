from django import forms
from django_file_form.forms import FileFormMixin, MultipleUploadedFileField
from .models import File


class FileUploadForm(FileFormMixin, forms.ModelForm):
    file = MultipleUploadedFileField(label="Выберите файлы")

    class Meta:
        model = File
        fields = ["file"]
