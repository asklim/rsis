/* */
const dbName = {
  rsiscfg : 'rsiscfg',
  rsistmp : 'rsistmp',
  rsissum : 'rsissum',
  rsiswp : 'rsiswp',
  rsiswc : 'rsiswc',
  rsiswn : 'rsiswn'
};


const staffRole = { 
  DA : {  
              id : 'DA',  
            name : 'Document Accounting',  
    description : 'Документарный Учет'  
  },  
  GC : {  
              id : 'GC', 
            name : 'General Contact',  
    description : 'Общий (Bosss)' 
  },  
  OM : {  
              id : 'OM',  
            name : 'Orders Manager', 
    description : 'Менеджер по заказам'  
  },  
  SP : {  
              id : 'SP',  
            name : 'Sale Person',
    description : 'Продавец на торговом месте' 
  }  
};

const staffStatus = {  
  A : {   
              id : 'A',  
            name : 'Actual',   
    description : 'В найме'   
  },  
  DC2BL : {  
              id : 'DC2BL',  
            name : 'Discharge to BlackList',  
    description : 'Уволен навсегда'  
  },  
  DC2R : {  
              id : 'DA',  
            name : 'Discharge to Reserve',  
    description : 'Уволен в запас'  
  },  
  WL : {  
              id : 'DA',  
            name : 'Waiting List',  
    description : 'В листе ожидания' 
  }  
};
 
const procurementPeriods = {
  short : 6,
  middle : 12,
  long : 36,
  xtraLong : 96,
};

const nextWorkDayTime = {
  time : "14:00",
  hours : 14,
  minutes : 0,
  delta : 50400000,  // 14*60*60*1000
};

module.exports = {
  staffRole,
  staffStatus,
  dbName,
  procurementPeriods,
  nextWorkDayTime,
};
