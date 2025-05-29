using Application.Models.Request;

namespace Application.Interfaces;

public interface IAuthenticationService
{
    string Authenticate(AuthenticationRequest authenticationRequest);

    // Recuperación de contraseña
    public string GeneratePasswordResetToken(ForgotPasswordRequest request);
    void ResetPassword(ResetPasswordRequest request);
}