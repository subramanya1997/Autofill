class ExeManager {
    constructor(currentUrl) {
        this.currentUrl = currentUrl;
        this.isCompanyDataAvailable = false;
        this.isUserDataAvailable = false;
        this.companyData = null;
        this.userData = null;
        this.auto_fill = null;
        this.popup = null;
    }

    change() {
        if (!this.isCompanyDataAvailable && this.companyData === null){
            this.isCompanyDataAvailable = true;
            this.companyData = new CompanyData(this.currentUrl, this);
            return;
        }
        if (!this.isUserDataAvailable && this.userData === null){
            this.isUserDataAvailable = true;
            this.userData = new UserData(this);
            return;
        }
        if (this.isCompanyDataAvailable && this.isUserDataAvailable && this.companyData !== null && this.userData !== null) {
            this.auto_fill = new AutoFill(this.userData.resume_json, 
                this.userData.resume_file, 
                this.userData.cover_letter,
                this.companyData.job_portal_type,
                this);
            this.auto_fill.resume_task();
        }
        else {
            console.log("Something went wrong");
        } 
    }

    create_popup() {
        this.popup = new Popup(this);
    }

    remove_popup() {
        this.popup = null;
    }
}
var autofill_manager = new ExeManager(document.URL);
autofill_manager.create_popup();