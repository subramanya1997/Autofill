const CompanyType  = {
    greenhouse: 'greenhouse',
    lever: 'lever'
}

class CompanyData{
    constructor(currentUrl, exeManager){
        this.currentUrl = currentUrl;
        this.job_portal_type = this.getJobPortalName();
        this.company_name = this.getCompanyName();
        exeManager.change();
    }

    getCompanyName(){
        if (this.job_portal_type === 'greenhouse'){
            return this.currentUrl.split('/')[3];
        }
        if (this.job_portal_type === 'lever'){
            return this.currentUrl.split('/')[3];
        }
    }

    getJobPortalName(){
        if (this.currentUrl.includes('greenhouse')){
            return CompanyType.greenhouse;
        }
        if (this.currentUrl.includes('lever')){
            return CompanyType.lever;
        }
    }

    printCompanyData(){
        console.log(`Compnay Name: ${this.company_name}`);
        console.log(`Portal Name: ${this.job_portal_type}`);
    }
}