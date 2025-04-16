using Application.Models.Request;

namespace Application.Interfaces;

public interface IAuthenticationService
{
    string Authenticate(AuthenticationRequest authenticationRequest);
}