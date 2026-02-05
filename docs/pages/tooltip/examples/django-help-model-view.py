# models.py
class HelpText(models.Model):
    """Textos de ayuda para formularios"""
    field_name = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=200)
    content = models.TextField()

    class Meta:
        verbose_name = "Texto de ayuda"

# views.py
def field_help(request, field_name):
    """Devuelve texto de ayuda para un campo"""
    try:
        help_text = HelpText.objects.get(field_name=field_name)
        return render(request, 'partials/help_tooltip.html', {
            'help': help_text
        })
    except HelpText.DoesNotExist:
        return HttpResponse("Sin ayuda disponible")
