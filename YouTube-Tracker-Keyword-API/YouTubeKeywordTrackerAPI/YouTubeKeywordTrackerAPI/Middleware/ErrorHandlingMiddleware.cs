using YouTubeKeywordTrackerAPI.Exceptions;

namespace YouTubeKeywordTrackerAPI.Middleware;

public class ErrorHandlingMiddleware : IMiddleware
{
    private readonly ILogger _logger;
    public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger)
    {
        _logger = logger;
    }
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next.Invoke(context);
        }
        catch (ResourceAlreadyExistException ex)
        {
            context.Response.StatusCode = 409;
            await context.Response.WriteAsync(ex.Message);
        }
        catch(ResourceNotFoundException ex)
        {
            context.Response.StatusCode = 404;
            await context.Response.WriteAsync(ex.Message);
        }
        catch(UnauthorizedAccessException ex)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync(ex.Message);
        }
        catch(EmptyCollectionException ex)
        {
            context.Response.StatusCode = 409;
            await context.Response.WriteAsync(ex.Message);
        }
        catch(ApiConnectionException ex)
        {
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync(ex.Message);
        }
        catch (Exception ex) 
        {
            _logger.LogError(ex, ex.Message.ToString());

            context.Response.StatusCode = 500;
            await context.Response.WriteAsync("Something went wrong");
        }
    }
}
