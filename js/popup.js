class Popup {
    constructor(manager=null) {
        this.auto_fill_btn = null;
        this.auto_fill_edit_btn = null;
        this.popup = this.create_popup();
        this.hide_popup();
        this.manager = manager;
    }

    create_popup() {
        let popup = document.createElement("div");
        popup.id = "popup_toast";
        popup.style = "top: 18px; right: 18px; position: fixed; z-index: 10000000000000; padding-right: 0rem !important; padding-left: 0rem !important; width: 32rem;";
        popup.classList.add("autofill_toast", "autofill_d-none");
        popup.setAttribute("data-autohide", "false");
        document.body.appendChild(popup);

        fetch(chrome.runtime.getURL('popup.html')).then(response => response.text()).then(data => {
            popup.innerHTML = data;
            this.auto_fill_btn = document.getElementById("auto_fill_btn");
            this.auto_fill_edit_btn = document.getElementById("auto_fill_edit_btn");
            this.add_event_listeners();
        });
        return popup;
    }

    add_event_listeners() {
        let self = this;
        this.auto_fill_btn.addEventListener("click", this.autoFillButtonClicked, false);
        this.auto_fill_btn.popup = self;
        this.auto_fill_edit_btn.addEventListener("click", this.autoFillEditButtonButtonClicked, false);
    }

    show_popup() {
        this.popup.classList.remove("autofill_d-none");
        $('#popup_toast').toast('show');
    }

    hide_popup() {
        $('#popup_toast').toast('hide');
    }

    autoFillButtonClicked(event) {
        event.preventDefault();
        this.popup.manager.change();
        this.popup.hide_popup();
    }

    autoFillEditButtonButtonClicked(event) {
        event.preventDefault();
        chrome.runtime.sendMessage({message: "open edit page"});
    }
}