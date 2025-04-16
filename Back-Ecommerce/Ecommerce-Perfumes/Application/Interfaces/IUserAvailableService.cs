using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserAvailableService
    {
        bool IsUserAvailable(int userId);
        bool UserExists(string nameAccount, string email, int? userId = null);
    }
}
