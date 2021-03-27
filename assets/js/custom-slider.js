
    var hargabarang = 10000000;
    $(document).ready(function() {
          //Added, set initial value.
          $("#angsuran").val(0);
          $("#angsuran-label").text(currency(0), 'Rp. ', 'angsuran');
          $("#angsuran-responsive").text(currency(0));

          $("#hargabarang").val(0);
          $("#hargabarang-label").text(currency(0), 'Rp. ', 'hargabarang');
          $("#hargabarang-responsive").text(currency(0));

          $("#uangmuka").val(0);
          $("#uangmuka-label").text(currency(0), 'Rp. ', 'uangmuka');
          $("#uangmuka-responsive").text(currency(0));

          $("#tenor").val(1);
          $("#tenor-label").text(1);
          $( "#tenor-responsive" ).text(0);

          $("#total-responsive").text(0);
          
          update();
      });

      //changed. now with parameter
      function update(slider,val) {
          //changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
          // var $angsuran = slider == 1?val:$("#angsuran").val();
          var $hargabarang = slider == 3?val:$("#hargabarang").val();
          var $uangmuka = slider == 4?val:$("#uangmuka").val();
          var $tenor = slider == 2?val:$("#tenor").val();
          /* commented
          $angsuran = $( "#slider" ).slider( "value" );
          $tenor = $( "#slider-tenor" ).slider( "value" );
          */
         $angsuran = (parseInt($hargabarang) + parseInt($hargabarang*30/100) - parseInt($uangmuka))/parseInt($tenor);

          //  $total = "Rp. " + ($angsuran * $tenor);
          $total = currency((parseInt($hargabarang) + parseInt($hargabarang*30/100)), 'Rp ');
          $("#angsuran").val($angsuran);
          $("#angsuran-label").text(currency(parseInt($angsuran)));
          $("#angsuran-responsive").text(currency(parseInt($angsuran)));

          $("#hargabarang").val($hargabarang);
          $("#hargabarang-label").text(currency($hargabarang));
          $("#hargabarang-responsive").text(currency($hargabarang));

          $("#uangmuka").val($uangmuka);
          $("#uangmuka-label").text(currency($uangmuka));
          $("#uangmuka-responsive").text(currency($uangmuka));
        
          $("#tenor").val($tenor);
          $("#tenor-label").text($tenor+' bulan');
          $("#tenor-responsive").text($tenor+' bulan');

          $("#total").val($total);
          $("#total-responsive").text($total);
          $("#total-label").text($total);

          $('#slider a').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+$angsuran+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
          $('#slider-tenor a').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+$tenor+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
      }

      function currency(angka, prefix = 'Rp ', tes) {
        if (angka == 0) {
          return prefix+'0';
        }
        var	number_string = angka.toString(),
        sisa 	= number_string.length % 3,
        rupiah 	= number_string.substr(0, sisa),
        ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
            
        if (ribuan) {
          separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
        }
        return prefix+rupiah;
      }
      getslider();
      function getslider() {
        
        $("#slider-hargabarang").slider({
            animate: true,
            value:1,
            min: 0,
            max: hargabarang,
            step: 1000,
            slide: function(event, ui) {
                update(3,ui.value); //changed
                // $("#slider-uangmuka").slider({
                //     animate: true,
                //     value:1,
                //     min: (parseInt($("#uangmuka").val()) || 0),
                //     max: parseInt(hargabarang) - (parseInt($("#hargabarang").val()) || 0),
                //     step: 1000,
                //     slide: function(event, ui) {
                //         update(4,ui.value); //changed
                //     }
                // });
            }
        });
        $("#slider-uangmuka").slider({
            animate: true,
            value:1,
            min: 0,
            max: parseInt(hargabarang) - (parseInt($("#hargabarang").val()) || 0),
            step: 1000,
            slide: function(event, ui) {
                update(4,ui.value); //changed
            }
        });
        $("#slider-angsuran").slider({
            animate: true,
            value:1,
            min: 0,
            max: 10000000,
            step: 1000,
            slide: function(event, ui) {
                update(1,ui.value); //changed
            }
        });

        $("#slider-tenor").slider({
            animate: true,
            value: 1,
            min: 1,
            max: 10,
            step: 1,
            slide: function(event, ui) {
                update(2,ui.value); //changed
            }
        });
        
      }
