/*
=====================================================
NOTIFICATIONS GROWL-LIKE
from http://bootstrap-growl.remabledesigns.com
=====================================================
*/






angular.module('app.serviceModule')



.service('GrowlService', [function () 
  {
	var self = this;
	
	var _TIME = 2000;	
	
   this.ALERT_INFO		=0;
   this.ALERT_WARNING 	=1;	
   this.ALERT_ERROR 	=2;
   this.ALERT_SUCCESS 	=3;
        
        
      
    this.showAlert = function(alert_style, alert_message)   
    	{
	    	// init ======================================================================
	    	var alert_title="";
	    	var alert_icon="";
	    	var alert_type="";
	    	
	    	
			switch(alert_style) 
			  {
			    case self.ALERT_INFO:
			        alert_title = 'Suggerimento'; 
			        alert_type = 'info';
			        alert_icon = 'fa fa-info';
			        break;
			    case self.ALERT_WARNING:
			        alert_title = 'Attenzione!'; 
			        alert_type = 'warning';
			        alert_icon = 'fa fa-exclamation-triangle';			        
			        break;
			    case self.ALERT_ERROR:
			        alert_title = 'Errore!'; 
			        alert_type = 'danger';
			        alert_icon = 'fa fa-minus-circle';			        
			        break;
			    case self.ALERT_SUCCESS:
			        alert_title = 'Ok'; 
			        alert_type = 'success';
			        alert_icon = 'fa fa-check';	
			        break;	        			        
			    default:
			        console.error('alert style unkown');
			        return;
			  };
			  
			  _show(alert_title, alert_icon, alert_message, alert_type);	    	
    	};
    	
    	
    	
    	// function ====================================================================
    	_show = function(alert_title, alert_icon, alert_message, alert_type)
    	{
 		 $.notify(
 		         {// options
				  title: '<strong>'+alert_title+'</strong>',
				  icon: alert_icon,
				  message: alert_message,
				  animate:{
					  	   enter: 'animated fadeInUp',
					  	   exit:  'animated fadeOutDown'
				  		  }		  
				 },
				 { // settings
				  type: alert_type,
				  delay: _TIME,
				  newest_on_top: true,
				  allow_dismiss: true,
				  showProgressbar:false, // timer before dismiss
				  placement: {
							  from: "bottom",
							  align: "left"
							 },
				  offset: 0				  
				 }
				 );	
    	}
   }])

.run(function(GrowlService) {});
