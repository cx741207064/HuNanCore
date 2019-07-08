using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JlueTaxSystemHuNanBS.Models
{
    public class FjsData
    {
        public FjsData(int index)
        {
            this.index = index;
            switch (index)
            {
                case 0:
                    zsxmmc = "城市维护建设税";
                    zsxmdm = "10109";
                    sl1 = 0.07M;
                    break;
                case 1:
                    zsxmmc = "教育费附加";
                    zsxmdm = "30203";
                    sl1 = 0.03M;
                    break;
                case 2:
                    zsxmmc = "地方教育附加";
                    zsxmdm = "30216";
                    sl1 = 0.02M;
                    break;
            }
        }

        public int index { get; set; }

        public string zsxmdm { get; set; }

        public string zsxmmc { get; set; }

        public decimal ybzzs { get; set; }

        public decimal zzsmdse { get; set; }

        public decimal xfs { get; set; }

        public decimal yys { get; set; }

        public decimal hj { get; set; }

        public decimal sl1 { get; set; }

        public decimal bqynsfe { get; set; }

        public string jmxzdm { get; set; }

        public string jmxzmc { get; set; }

        public decimal jme { get; set; }

        public decimal phjmse { get; set; }

        public decimal bqyjse { get; set; }

        public decimal bqybtse { get; set; }

    }
}
