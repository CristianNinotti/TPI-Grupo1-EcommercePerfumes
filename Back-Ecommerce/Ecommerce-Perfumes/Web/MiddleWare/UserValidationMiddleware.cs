using Application.Interfaces;

public class UserValidationMiddleware
{
    private readonly RequestDelegate _next;

    public UserValidationMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    public async Task InvokeAsync(HttpContext context, IUserAvailableService userAvailableService)
    {
        var userIdClaim = context.User.FindFirst("Id")?.Value;
        if (userIdClaim != null)
        {
            if (!int.TryParse(userIdClaim, out int userId))
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsync("ID de usuario inválido");
                return;
            }

            var isUserAvailable = userAvailableService.IsUserAvailable(userId);
            if (!isUserAvailable)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Usuario inhabilitado");
                return;
            }
        }
        await _next(context);
    }
}