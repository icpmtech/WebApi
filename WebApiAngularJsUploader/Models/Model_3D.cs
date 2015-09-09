using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiUploaderModels.Models
{
    public class WorkFlowState<T>
    {
        public int id { get; set; }
        public string  State { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }


    }
    public class ModelBase<T,C>
    {
        public DateTime CreateDate { get; set; }
        public int id { get; set; }
        public WorkFlowState<C> WorkFlowState { get; set; }
        public string Name { get; set; }
        public string TypeFile { get; set; }
        public DateTime UpdateDate { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<DefectType<T>> Defects { get; set; }




        
   

        
        public ModelBase()
        {
            Defects = new List<DefectType<T>>();
        }
    }
     public class Model_3D : ModelBase<string,int>
    {
       
        public byte[] OriginalModel3D { get; set; }
        public Model_3D()
        {

        }

    }
    public class DefectType <T>
    {
        public int id { get; set; }
        public List<T> DefectsByType { get; set; }
    }
    public class Model_2D : ModelBase<string,int>
    {
      
        public byte[] OriginalModel2D { get; set; }

      

    }
}