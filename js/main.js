window.onload  = function() {
    RenameDrive.render();
};

var RenameDrive = {
    types: {
        "street":     "вулиця",
        "lane":       "провулок",
        "avenue":     "проспект",
        "impasse":    "тупик",
        "square":     "площа",
        "embankment": "набережна",
        "park":       "парк",
        "slope":      "узвіз",
        "area":       "житловий масив"
    },
    data: {},
      
    render: function () {
        var self = this, arr, 
            core = $("#rename-data"), head, data, strings = "", item;
    
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
                head = $("<h3>"+ arr[key].newAreaName + " (" +arr[key].oldAreaName+ ")" +"</h3>");
                strings = "";
                if(arr[key].objects.length > 0) {
                    for (var i=0, l = arr[key].objects.length; i<l ; i++) {
                        item = arr[key].objects[i];
                        strings += '<div class="data-line"><div class="object-type">' + 
                                self.types[item.type] + 
                                '</div><div class="object-old">'+ item.oldName + 
                                '</div><div class="object-new">'+ item.newName + 
                                "</div></div>";
                    }
                }
                data = $("<div>" + strings + "</div>");
                core.append(head).append(data);
            }
            $( "#rename-data" ).accordion({
                collapsible: true,
                active: false,
                heightStyle: "content"
            });
        });
    }
};