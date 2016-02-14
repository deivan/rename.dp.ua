window.onload  = function() 
{
    var keyPressed = false;
    RenameDrive.render();
    $(window).keydown(function (e) { 
        if(e.keyCode == 13 && !keyPressed) {
            RenameDrive.findClick();
            keyPressed = true;            
        }
    }).keyup(function () {
            // keep time for show line value
            if(keyPressed) {
                setTimeout(function(){
                    keyPressed = false;
                },200);
            }
        });
};

var RenameDrive = {
    types: {
        street:     "вулиця",
        lane:       "провулок",
        avenue:     "проспект",
        impasse:    "тупик",
        square:     "площа",
        embankment: "набережна",
        park:       "парк, сквер",
        slope:      "узвіз",
        area:       "житловий масив",
        lake:       "затока",
        island:     "острів",
        station:    "станція"
    },
    linkTypes: ["особа", "подія", "об’єкт", "суб’єкт"],
    data: {},
      
    render: function () {
        var self = this, arr, 
            core = $("#rename-data"), head, data, strings = "", item, link, restored;
    
        $.ajax({
            method: "GET",
            url: "rename.json",
            dataType: "json",
            contentType: "text/json; charset=UTF-8",
            crossDomain: "true"
        })
        .done(function(d) {
            
            self.data = d;
            arr = d;
            for(var key in arr) {
                if(key != "lastUpdate") {
                    head = $("<h3>"+ arr[key].newAreaName + " (" +arr[key].oldAreaName+ ")" +"</h3>");
                    strings = "";
                    if(arr[key].objects.length > 0) {
                        strings += '<div class="data-line-header"><div class="object-old">Стара назва</div><div class="object-new">Нова назва</div><div class="object-restore-header">&nbsp;</div><div class="object-link">На честь</div></div>';
                        for (var i=0, l = arr[key].objects.length; i<l ; i++) {
                            item = arr[key].objects[i];
                            link = item.link === undefined ? 
                                    "" : 
                                    '<a href="'+item.link.href+'">'+self.linkTypes[item.link.type]+'</a>';
                            restored = item.restored === undefined ?
                                    '<div class="object-restore-header"></div>' :
                                    '<div class="object-restore" title="Повернута історична назва"></div>';
                            strings += '<div class="data-line">' + 
                                    '<div class="object-old">'+  item.oldName + ', <em>'+ self.types[item.type] + '</em></div>' +
                                    '<div class="object-new">'+  item.newName + 
                                    (!!item.newType ? ', <strong><em>'+ self.types[item.newType] + '</em></strong>' : '') +
                                    '</div>' + restored +
                                    '<div class="object-link">'+ link + '</div>' +
                                    "</div>";
                        }
                    }
                    data = $("<div>" + strings + "</div>");
                    core.append(head).append(data);
                }
            }
            $( "#rename-data" ).accordion({
                collapsible: true,
                active: false,
                heightStyle: "content"
            });
            
            setTimeout(function(){
                $("#overlay").hide();
            }, 500);
        });
        
        $('.find-input')
            .on('focus', function(){
                $('.find-icon').addClass("pulsation");
            })
            .on('blur', function(){
                $('.find-icon').removeClass("pulsation");
            });
            
        $('.find-icon').on('click', function() {
            self.findClick();
        });
        
        $(".find-close-icon").on('click', function() {
            $(this).addClass("hidden");
            $(".find-results").html("").addClass("hidden");
            $('.find-input').val("")
        });
        
    },
    
    findClick: function() {
        var pattern = $('.find-input').val().trim().toLowerCase();
        if(pattern.length < 3) return;
        this.find(pattern);
    },
    
    find: function (pattern) {
        var self = this, results = '', obj, area, 
            findArray = this.makeSimilar(pattern);

        for (var key in this.data) {
            if(key != "lastUpdate") {
                obj = this.data[key].objects;
                area = this.data[key].oldAreaName + " (" + this.data[key].newAreaName +")";
                for(var i = 0, l = obj.length; i<l ; i++) {
                    for (var j=0, m=findArray.length; j<m ; j++) {
                        if(obj[i].oldName.toLowerCase().indexOf(findArray[j]) !==-1 || 
                           obj[i].newName.toLowerCase().indexOf(findArray[j]) !==-1 ) {
                            results +=
                                '<div class="find-result-header">'+ area +'</div>' +
                                '<div class="data-line"><div class="result-label">По-старому:&nbsp;</div>' + 
                                '<div class="object-old">'+  obj[i].oldName + ', <em>'+ self.types[obj[i].type] +
                                '</em></div><div class="result-label">По-новому:&nbsp;</div><div class="object-new">'+  obj[i].newName + 
                                (!!obj[i].newType ? ', <strong><em>'+ self.types[obj[i].newType] + '</em></strong>' : '') +
                                '</div></div>';
                            break;
                        }
                    }
                }
            }
        }
        if(results == '') results = "<span style=\"color:#800;\">По запросу <strong>"+ pattern +"</strong> не нашлось результатов...</span>";
        $(".find-results").html(results).removeClass("hidden");
        $(".find-close-icon").removeClass("hidden");
        $(".find-input").val("")
    },
    
    makeSimilar: function(pattern) {
        var pos = 0, newPattern, arr = [];
        arr.push(pattern);
        if (pattern.indexOf("и")) {
            newPattern = pattern.replace(/и/,"і");
            arr.push(newPattern);
        }
        return arr;
    }
};