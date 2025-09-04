app.service("AlertService", function() {

    this.show = function(title, icon = "info", options = {}) {
        return Swal.fire({
            title: title,
            icon: icon,
            draggable: true,
            timer: icon === "success" ? 2000 : undefined,
            showConfirmButton: icon !== "success",
            ...options
        });
    };

    this.success = function(title, options = {}) {
        return this.show(title, "success", options);
    };

    this.error = function(title, options = {}) {
        return this.show(title, "error", options);
    };

    this.warning = function(title, options = {}) {
        return this.show(title, "warning", options);
    };

    this.info = function(title, options = {}) {
        return this.show(title, "info", options);
    };

});