import axios, {AxiosResponse} from 'axios';

class Controller {
    static apiURL: string = '127.0.0.1:3000';

    static ready(): boolean {
        // GET /

        let response: boolean = false;
        axios.get(Controller.apiURL + '/')
            .then((): void => {
                response = true;
            })

        return response;
    }

    static generateChangelog(base_path: string, modified_path: string): JSON | undefined {
        // POST /chgen
        const request: {base_path: string, modified_path: string} = {
            base_path,
            modified_path
        };

        let response: JSON | undefined;
        axios.post(Controller.apiURL + '/chgen', request)
            .then(({data}: {data: string}): void => {
                response = JSON.parse(data);
            });

        return response;
    }

    static generateTransferChangelog(unmodified_copy_path: string, modified_copy_path: string): JSON | undefined {
        // POST /transfer
        const request: {unmodified_copy_path: string, modified_copy_path: string} = {
            unmodified_copy_path,
            modified_copy_path
        };

        let response: JSON | undefined;
        axios.post(Controller.apiURL + '/transfer', request)
            .then(({data}: {data: string}): void => {
                response = JSON.parse(data);
            });

        return response;
    }

    static transfer(destination_path: string): void {
        // POST /transfer/confirm
        const request: {destination_path: string} = {
            destination_path
        }

        axios.post(Controller.apiURL + '/transfer/confirm', request)
    }

    static lastTransferChangelog(): JSON | undefined {
        // GET /transfer/changelog

        let response: JSON | undefined;
        axios.get(Controller.apiURL + '/transfer/changelog')
            .then(({data}: {data: string}): void => {
                response = JSON.parse(data);
            })

        return response;
    }

    static generateSubmissionChangelog(unmodified_copy_path: string, modified_copy_path: string): JSON | undefined {
        // POST /submit
        const request: {unmodified_copy_path: string, modified_copy_path: string} = {
            unmodified_copy_path,
            modified_copy_path
        };

        let response: JSON | undefined;
        axios.post(Controller.apiURL + '/submit', request)
            .then(({data}: {data: string}): void => {
                response = JSON.parse(data);
            });

        return response;
    }

    static submit(archive_path: string | null): void {
        // POST /submit/confirm
        const request: {archive_path: string} | {} = archive_path ? {
            archive_path
        } : {};

        axios.post(Controller.apiURL + '/transfer/confirm', request)
    }

    static lastSubmissionChangelog(): JSON | undefined {
        // GET /submit/changelog

        let response: JSON | undefined;
        axios.get(Controller.apiURL + '/submit/changelog')
            .then(({data}: {data: string}): void => {
                response = JSON.parse(data);
            })

        return response;
    }
}

export default Controller;
