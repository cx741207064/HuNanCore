using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHuNanBS.Models
{
    public class FjsModel
    {
        public IEnumerable<FjsData> FjsData { get; set; }

        public Nsrxx Nsrxx { get; set; }

        public GDTXDate GDTXDate { get; set; }

        public string SBZT { get; set; }

    }
}