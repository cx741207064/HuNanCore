using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHuNanBS.Code
{
    public class CurrentUser
    {
        private static CurrentUser singleton;

        public static IHttpContextAccessor hca;

        private ISession session => hca.HttpContext.Session;

        private CurrentUser()
        {
        }
        public static CurrentUser GetInstance()
        {
            if (singleton == null)
            {
                singleton = new CurrentUser();
            }
            return singleton;
        }

        #region 当前用户信息
        /// <summary>
        /// 获取当前用户填写的报表编号
        /// </summary>
        public string GetReportCode
        {
            get { return hca.HttpContext.Session.GetString("reportCode"); }
        }
        /// <summary>
        /// 获取当前用户id
        /// </summary>
        public string GetCurrentUserId
        {
            get { return session.GetString("userId"); }
        }
        /// <summary>
        /// 获取当前用户登录名
        /// </summary>
        public string GetCurrentUserName
        {
            get { return session.GetString("username"); }
        }
        /// <summary>
        /// 获取当前用户ClassId，题库用
        /// </summary>
        public string GetCurrentClassId
        {
            get { return session.GetString("classId"); }
        }
        /// <summary>
        /// 获取当前用户CourseId，题库用
        /// </summary>
        public string GetCurrentCourseId
        {
            get { return session.GetString("courseId"); }
        }
        /// <summary>
        /// 获取当前用户sortid，题库用
        /// </summary>
        public string GetCurrentSortid
        {
            get { return session.GetString("sortid"); }
        }
        /// <summary>
        /// 获取当前用户共享的题目questionId
        /// </summary>
        public string GetCurrentQuestionId
        {
            get { return session.GetString("questionId"); }
        }
        /// <summary>
        /// 获取当前用户的题目questionId
        /// </summary>
        public string GetCurrentUserQuestionId
        {
            get { return session.GetString("userquestionId"); }
        }
        /// <summary>
        /// 获取当前用户发生日期
        /// </summary>
        public string GetCurrentHappenDate
        {
            get { return session.GetString("happenDate"); }
        }
        /// <summary>
        /// 获取当前用户操作公司id
        /// </summary>
        public string GetCurrentCompanyId
        {
            get { return session.GetString("companyId"); }
        }

        /// <summary>
        /// 获取当前用户操作公司名称
        /// </summary>
        public string GetCurrentCompanyName
        {
            get { return session.GetString("companyName"); }
        }

        /// <summary>
        /// 获取当前用户操作公司纳税人识别号
        /// </summary>
        public string GetCurrentCompanyNSRSBH
        {
            get { return session.GetString("companyNSRSBH"); }
        }

        /// <summary>
        /// 税款申报期起
        /// </summary>
        public string GetCurrentQuestionSKSSQQ
        {
            get { return session.GetString("skssqq"); }
        }

        /// <summary>
        /// 税款申报期止
        /// </summary>
        public string GetCurrentQuestionSKSSQZ
        {
            get { return session.GetString("skssqz"); }
        }

        /// <summary>
        /// 申报期限
        /// </summary>
        public string GetCurrentQuestionSBQX
        {
            get { return session.GetString("sbqx"); }
        }

        /// <summary>
        /// 发生日期
        /// </summary>
        public string GetCurrentQuestionHappenDate
        {
            get { return session.GetString("happenDate"); }
        }

        /// <summary>
        /// 当前用户的各自单独的应申报清册id
        /// </summary>
        public string GetCurrentUserYSBQCId
        {
            get { return session.GetString("userYSBQCId"); }
        }

        /// <summary>
        /// 当前用户共享的应申报清册id
        /// </summary>
        public string GetCurrentYSBQCId
        {
            get { return session.GetString("ysbqcId"); }
        }
        #endregion
    }
}