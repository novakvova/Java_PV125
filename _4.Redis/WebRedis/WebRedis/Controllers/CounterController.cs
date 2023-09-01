using ServiceStack.Redis;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebRedis.Helpers;
using WebRedis.Models;

namespace WebRedis.Controllers
{
    public class CounterController : Controller
    {
        private readonly CacheStrigsStack _cacheStrigsStack;
        public CounterController()
        {
            _cacheStrigsStack = new CacheStrigsStack();
        }
        // GET: Counter
        public ActionResult Counter()
        {
            List<UserItemViewModel> model;
            if (_cacheStrigsStack.IsKeyExists("usersList"))
            {
                model = _cacheStrigsStack.GetList<List<UserItemViewModel>>("usersList");
            }
            else
            {
                model = new List<UserItemViewModel>() {
                    new UserItemViewModel
                    {
                        Id = 1,
                        Name = "Test "+DateTime.Now,
                        Phone="+38 098 234 32 11"
                    },
                    new UserItemViewModel
                    {
                        Id = 1,
                        Name = "Test",
                        Phone="+38 098 234 32 11"
                    }
                };
                _cacheStrigsStack.StoreList<List<UserItemViewModel>>("usersList", model, TimeSpan.FromMinutes(5));

            }
            //var host = ConfigurationManager.AppSettings["host"].ToString();
            //var port = Convert.ToInt32(ConfigurationManager.AppSettings["port"]);
            //RedisEndpoint redisEndpoint = new RedisEndpoint(host, port);

            //using (var client = new RedisClient(redisEndpoint))
            //{
            //    ViewBag.Visit = client.Increment("Website_Counter", 1);
            //}
            return View(model);
        }
    }
}