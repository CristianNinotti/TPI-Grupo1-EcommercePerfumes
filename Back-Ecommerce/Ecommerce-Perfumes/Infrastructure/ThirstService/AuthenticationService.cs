using Application.Interfaces;
using Application.Models.Helpers;
using Application.Models.Request;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.ThirdServices;

public class AuthenticationService : IAuthenticationService
{
    private readonly IMayoristaRepository _mayoristaRepository;
    private readonly IMinoristaRepository _minoristaRepository;
    private readonly ISuperAdminRepository _superAdminRepository;
    private readonly AuthenticationServiceOptions _options;

    public AuthenticationService(
        IMayoristaRepository mayoristaRepository,
        IMinoristaRepository minoristaRepository,
        ISuperAdminRepository superAdminRepository,
        IOptions<AuthenticationServiceOptions> options)
    {
        _mayoristaRepository = mayoristaRepository;
        _minoristaRepository = minoristaRepository;
        _superAdminRepository = superAdminRepository;
        _options = options.Value;
    }


    private User? ValidateUser(AuthenticationRequest authenticationRequest)
    {
        User? user = null;

        var mayoristas = _mayoristaRepository.GetAllMayoristas();
        user = mayoristas.FirstOrDefault(x =>
            x.NameAccount.Equals(authenticationRequest.NameAccount) &&
            x.Password.Equals(authenticationRequest.Password));

        if (user != null)
        {
            if (!user.Available)
                throw new UnauthorizedAccessException("El usuario ha sido desactivado.");

            return user;
        }

        var minoristas = _minoristaRepository.GetAllMinoristas();
        user = minoristas.FirstOrDefault(x =>
            x.NameAccount.Equals(authenticationRequest.NameAccount) &&
            x.Password.Equals(authenticationRequest.Password));

        if (user != null)
        {
            if (!user.Available)
                throw new UnauthorizedAccessException("El usuario ha sido desactivado.");

            return user;
        }

        var superAdmins = _superAdminRepository.GetAllSuperAdmins();
        user = superAdmins.FirstOrDefault(x =>
            x.NameAccount.Equals(authenticationRequest.NameAccount) &&
            x.Password.Equals(authenticationRequest.Password));

        if (user != null && !user.Available)
        {
            throw new UnauthorizedAccessException("El usuario ha sido desactivado.");
        }

        return user;
    }



    public string Authenticate(AuthenticationRequest authenticationRequest)
    {
        var user = ValidateUser(authenticationRequest);

        if (user == null)
        {
            throw new UnauthorizedAccessException("Authentication failed");
        }

        var securityPassword = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_options.SecretForKey));

        var credentials = new SigningCredentials(securityPassword, SecurityAlgorithms.HmacSha256);

        var claimsForToken = new List<Claim>();
        claimsForToken.Add(new Claim("Id", user.Id.ToString()));
        claimsForToken.Add(new Claim("Name", user.FirstName));
        claimsForToken.Add(new Claim("LastName", user.LastName));
        claimsForToken.Add(new Claim("TypeUser", user.TypeUser));

        var jwtSecurityToken = new JwtSecurityToken(
            _options.Issuer,
            _options.Audience,
            claimsForToken,
            DateTime.UtcNow,
            DateTime.UtcNow.AddMinutes(60),
            credentials);

        var tokenToReturn = new JwtSecurityTokenHandler()
            .WriteToken(jwtSecurityToken);

        return tokenToReturn.ToString();
    }
}