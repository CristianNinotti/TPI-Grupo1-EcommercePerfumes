using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IProductOrCategoryService
    {

        bool ProductExists(string product);
        public bool CategoryExists(string category);

    }
}
