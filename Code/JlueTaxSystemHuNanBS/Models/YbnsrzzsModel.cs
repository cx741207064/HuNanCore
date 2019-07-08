using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JlueTaxSystemHuNanBS.Models
{
    public class YbnsrzzsModel
    {
        public Nsrxx Nsrxx { get; set; }

        public GDTXDate GDTXDate { get; set; }

        public JToken reportData { get; set; }

    }
}
