import { ChangeEvent, Component, PureComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import 'reactjs-popup/dist/index.css';
import { SaveAndEditModal } from "../functions";
import IProjectDetails from "../types/projects.type";
import AddEditProject from '../components/add-edit-project'
import { constants } from "buffer";
import IUserData from "../types/user.type";
import { Redirect } from "react-router-dom";
import UserDataService from "../services/user.service";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {};
type State = {
    projectDetails: IProjectDetails[];
    showDialog: boolean;
    editProject: IProjectDetails;
    isLogged: boolean;
    userId: number;
}
export default class Home extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            projectDetails:
                [{ carbonEmission: '', createby: 0, id: 0, offsetValue: '', projectName: '' }],
            showDialog: false,
            editProject: { carbonEmission: '', createby: 0, id: 0, offsetValue: '', projectName: '' },
            isLogged: false,
            userId: 0
        }
        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeOffset = this.onChangeOffset.bind(this);
        this.onChangeCarbonEmission = this.onChangeCarbonEmission.bind(this);
    }
    editProjectDetails(selectedProjectId: number) {
        UserDataService.getProjectById(selectedProjectId).then((response) => {
            if (response && response.data) {
                let res = response.data;
                let project: IProjectDetails = {
                    carbonEmission: res.carbon_emission,
                    createby: res.created_by,
                    id: res.id,
                    offsetValue: res.offset_value,
                    projectName: res.name
                }
                this.setState({
                    projectDetails: this.state.projectDetails,
                    showDialog: true,
                    editProject: project
                });
            }
        });
    }
    addNewProject() {
        this.setState({
            projectDetails: this.state.projectDetails,
            showDialog: true,
            editProject: { carbonEmission: '', createby: 0, id: 0, offsetValue: '', projectName: '' }
        });
    }
    deleteProjectDetails(selectedProjectId: number) {
        UserDataService.deleteProject(selectedProjectId)
            .then((response: any) => {
                this.getGridDate();
                this.setState({
                    showDialog: false
                });
            })
            .catch((e: Error) => {
                console.log(e);
                this.setState({
                    showDialog: false
                });
            });
    }
    closeModal() {
        this.setState({
            projectDetails: this.state.projectDetails,
            showDialog: false
        });
    }
    componentDidMount() {
        this.getGridDate();
    }
    getGridDate() {
        UserDataService.getAllProjects(this.getUserId()).then((response: any) => {
            let projects = this.state.projectDetails;
            if (response && response.data) {
                projects = [];
                let res = response.data;
                res.forEach((proj: any) => {
                    projects.push({
                        carbonEmission: proj.carbon_emission,
                        createby: proj.created_by,
                        id: proj.id,
                        offsetValue: proj.offset_value,
                        projectName: proj.name
                    });
                });
            }
            this.setState({ projectDetails: projects });
        });
    }
    onChangeProjectName(e: ChangeEvent<HTMLInputElement>) {
        const projectName = e.target.value;
        this.setState((prevState) => ({
            editProject: {
                ...prevState.editProject,
                projectName: projectName
            },
        }));
        e?.preventDefault();
    }
    onChangeCarbonEmission(e: ChangeEvent<HTMLInputElement>) {
        const carbonEmission = e.target.value;
        this.setState((prevState) => ({
            editProject: {
                ...prevState.editProject,
                carbonEmission: carbonEmission
            },
        }));
    }
    onChangeOffset(e: ChangeEvent<HTMLInputElement>) {
        const offSet = e.target.value;
        this.setState((prevState) => ({
            editProject: {
                ...prevState.editProject,
                offsetValue: offSet
            },
        }));
    }
    userdetails: string | null = '';
    getUserId() {
        this.userdetails = localStorage.getItem('userDetails');
        let user: any = '';
        if (this.userdetails) {
            user = JSON.parse(this.userdetails);
            return user.id
        }

    }
    handelClosePopup = () => {
        this.setState({
            showDialog: false
        });
    }
    handleCallback = (projectInfo: any) => {
        const { projectDetails, editProject, showDialog } = this.state;
        let data = {
            name: projectInfo.projectName,
            carbon_emission: projectInfo.carbonEmission,
            offset_value: projectInfo.offsetValue,
            created_by: this.getUserId()
        }
        if (projectInfo.id == 0) {
            UserDataService.addProject(data)
                .then((response: any) => {
                    this.getGridDate();
                    this.setState({
                        showDialog: false
                    });
                })
                .catch((e: Error) => {
                    console.log(e);
                    this.setState({
                        showDialog: false
                    });
                });
        } else {
            let res = {
                name: projectInfo.projectName,
                carbon_emission: projectInfo.carbonEmission,
                offset_value: projectInfo.offsetValue,
                created_by: this.getUserId()
            }
            UserDataService.updateProject(res, projectInfo.id)
                .then((response: any) => {
                    this.getGridDate();
                    this.setState({
                        showDialog: false
                    });
                })
                .catch((e: Error) => {
                    console.log(e);
                    this.setState({
                        showDialog: false
                    });
                });

            this.setState({
                projectDetails: projectDetails,
                showDialog: false
            });
        }
    }
    userDetails: IUserData = {}
    isUserLogged() {
        let data = localStorage.getItem('userDetails');
        if (data) {
            return true;
        }
        else
            return false;
    }
    generateGraph(): any {
        let { projectDetails } = this.state;
        let gridData = [{ name: '', CarbonEmission: 0, Offset: 0, amt: 5000 }];
        gridData.splice(0,1);
        if (projectDetails) {
            projectDetails.forEach((item: IProjectDetails) => {
                gridData.push({
                    name: item.projectName,
                    CarbonEmission: parseInt(item.carbonEmission),
                    Offset: parseInt(item.offsetValue),
                    amt: 5000
                });
            });
        }
        return gridData;
    }
    render() {
        const graphData = this.generateGraph();
        let projects = this.state;
        const ShowModal = () => {
            if (projects.showDialog) {
                return <AddEditProject data={projects.editProject} calcelCallback={this.handelClosePopup} parentCallback={this.handleCallback}></AddEditProject>
            } else
                return <div></div>
        }
        const ProjectBarchart = () => {
            return <div>
                <hr></hr>
                <BarChart
                    width={500}
                    height={300}
                    data={graphData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="CarbonEmission" fill="#8884d8" />
                    <Bar dataKey="Offset" fill="#82ca9d" />
                </BarChart>
            </div>
        }
        const Table = (projects: any) => {
            if (projects && projects.data.length > 0) {
                return <div>
                    <p>List of Projects
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <td>Project ID
                                </td>
                                <td>Project Name
                                </td>
                                <td>Carbon Emission
                                </td>
                                <td>Offset Value
                                </td>
                                <td>
                                    Actions
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.data.map((project: any, index: number) =>
                                <Row key={index} data={project} />
                            )}
                        </tbody>
                    </table>
                </div>
            }
            else
                return <span>No Records Found</span>
        }
        const Row = (proj: any) => <tr>
            <td>{proj.data.id}
            </td>
            <td>{proj.data.projectName}
            </td>
            <td>{proj.data.carbonEmission}
            </td>
            <td>{proj.data.offsetValue}
            </td>
            <td>
                <Button variant="primary" onClick={() => this.editProjectDetails(proj.data.id)}>
                    Edit
                </Button>
                <Button variant="secondary" onClick={() => this.deleteProjectDetails(proj.data.id)}>Delete</Button>
            </td>
        </tr>
        if (!this.isUserLogged())
            return <Redirect to='/login' />
        return <div>
            <Button variant="primary" onClick={() => this.addNewProject()}>
                Add New Project
            </Button>
            <Table data={projects.projectDetails} />
            <ProjectBarchart />
            <ShowModal></ShowModal>
        </div >
    }
}