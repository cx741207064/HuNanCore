using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace JlueTaxSystemHuNanBS.Models
{
    public class postData
    {
        public string tid { get; set; }

        public string ctrl { get; set; }

        public string page { get; set; }

        public JArray data { get; set; }

        public bool bindParam { get; set; }

    }
}
