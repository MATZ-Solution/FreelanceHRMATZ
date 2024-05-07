import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import StickyBox from "react-sticky-box";
import { bank_line, paypal_line, wallet_icon } from "../../imagepath";
import { Sidebar } from "../sidebar";
import { useState } from "react";
import ErrorModal from "../../../../admin/component/pages/CustomModal/ErrorsModal";
import Loader from "../../loader";

const FreelancerAppliedProject = () => {
  useEffect(() => {
    document.body.className = "dashboard-page";
    return () => {
      document.body.className = "";
    };
  });

  let [error, setError] = useState(false)
  let token = localStorage.getItem('token')
  let [projectData, setProjectData] = useState([])
  let [loader, setLoader] = useState(true)
  const getAllProject = async () => {
    try {
      const getAllProjectRequest = await fetch(`https://freelanceserver.matzsolutions.com/project/allAppliedProject`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      if (!getAllProjectRequest.ok) {
        setError(true)
        setLoader(false)
      }
      const response = await getAllProjectRequest.json()
      console.log(response)
      if (response?.message === 'Success' || response?.message === 'Project Not Found') {
        setProjectData(response?.data)
        setLoader(false)
      }
    } catch (err) {
      console.log(err)
      setError(true)
      setLoader(false)

    }
  }


  // #########################  FUNCTION START #########################################

  function dates(date) {
    const dates = new Date(date);
    const formattedDate = dates.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return formattedDate
  }

  // ######################### FUNCTION END #########################################


  useEffect(() => {
    getAllProject()
  }, [])

  if (loader) {
    return <Loader />
  }

  if (error) {
    return <ErrorModal message={'Something Went Wrong'} />
  }

  console.log("this is all project", projectData)
  return (
    <>
      {/* Page Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-md-4 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <Sidebar values='appliedProject' />
              </StickyBox>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="dashboard-sec payout-section">
                <div className="page-title portfolio-title" style={{ marginBottom: "0px" }}>
                  <h3 className="mb-0">Applied Project</h3>
                  {/* <Link
                    className="btn btn-primary title-btn"
                    data-bs-toggle="modal"
                    to="#payout_modal"
                  >
                    <i className="feather-settings" /> Payout Setting
                  </Link> */}
                </div>
                {/* <div className="widget-section">
                  <div className="row row-gap">
                    <div className="col-md-6 col-xl-4 d-flex">
                      <div className="dash-widget flex-fill">
                        <div className="dash-info">
                          <div className="d-flex">
                            <div className="dashboard-icon">
                              <img src={wallet_icon} alt="Img" />
                            </div>
                            <div className="dash-widget-info">
                              <span>Previous Payout</span>
                              <h5>$5,231.00</h5>
                            </div>
                          </div>
                          <div className="badge badge-paid">
                            <span>Paid</span>
                          </div>
                        </div>
                        <div className="dash-widget-more d-flex align-items-center justify-content-between">
                          <div className="dash-widget-date">
                            <span>17 Aug 2023</span>
                          </div>
                          <Link
                            to="/freelancer-completed-projects"
                            className="d-flex"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-xl-4 d-flex">
                      <div className="dash-widget flex-fill">
                        <div className="dash-info">
                          <div className="d-flex">
                            <div className="dashboard-icon">
                              <img src={wallet_icon} alt="Img" />
                            </div>
                            <div className="dash-widget-info">
                              <span>Balance</span>
                              <h5>$3,270.00</h5>
                            </div>
                          </div>
                          <div className="badge badge-pending">
                            <span>Pending</span>
                          </div>
                        </div>
                        <div className="dash-widget-more d-flex align-items-center justify-content-between">
                          <div className="dash-widget-date">
                            <Link to="#"> Payout Request</Link>
                          </div>
                          <Link
                            to="/freelancer-completed-projects"
                            className="d-flex"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-xl-4 d-flex">
                      <div className="dash-widget flex-fill d-flex align-items-center">
                        <div className="dash-info mb-0">
                          <div className="d-flex">
                            <div className="dashboard-icon">
                              <img src={wallet_icon} alt="Img" />
                            </div>
                            <div className="dash-widget-info">
                              <span>Total Projects</span>
                              <h5>107</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* Table */}
                <div className="table-top-section">
                  {/* <div className="table-header">
                    <h5 className="mb-0">Payout History</h5>
                  </div> */}
                </div>

                {
                  !projectData ?
                    <p>No Project Found</p>
                    :
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Project Title</th>
                            <th>Project Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Delievery Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            projectData?.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td>{data.projectTitle}</td>
                                  <td>{data.projectType}</td>
                                  <td>{data.amount}</td>
                                  <td>
                                    <div className={`badge ${data.status === 'pending' ? 'badge-pending' : data.status === 'success' ? 'badge-success' : 'badge-fail'}`}>
                                      <span>{data.status}</span>
                                    </div>
                                  </td>
                                  <td>{dates(data.deliveryDate)}</td>
                                </tr>
                              )
                            })
                          }
                          {/* <tr>
                        <td>29 Sep 2023, 11:26 PM</td>
                        <td>PayPal</td>
                        <td>$80.00</td>
                        <td>
                          <div className="badge badge-pending">
                            <span>Pending</span>
                          </div>
                        </td>
                        <td>29 Sep 2023, 12:26 PM</td>
                      </tr>
                      <tr>
                        <td>17 Sep 2023, 09:14 AM</td>
                        <td>Stripe</td>
                        <td>$20.50</td>
                        <td>
                          <div className="badge badge-paid">
                            <span>Paid</span>
                          </div>
                        </td>
                        <td>17 Sep 2023, 010:14 AM</td>
                      </tr>
                      <tr>
                        <td>13 Sep 2023, 11:15 AM</td>
                        <td>Bank Transfer</td>
                        <td>$35.70</td>
                        <td>
                          <div className="badge badge-paid">
                            <span>Paid</span>
                          </div>
                        </td>
                        <td>13 Sep 2023, 12:15 AM</td>
                      </tr>
                      <tr>
                        <td>07 Sep 2023, 05:37 PM</td>
                        <td>PayPal</td>
                        <td>$62.80</td>
                        <td>
                          <div className="badge badge-paid">
                            <span>Paid</span>
                          </div>
                        </td>
                        <td>07 Sep 2023, 07:37 PM</td>
                      </tr>
                      <tr>
                        <td>02 Sep 2023, 07:42 PM</td>
                        <td>Stripe</td>
                        <td>$73.30</td>
                        <td>
                          <div className="badge badge-paid">
                            <span>Paid</span>
                          </div>
                        </td>
                        <td>02 Sep 2023, 08:42 PM</td>
                      </tr> */}
                        </tbody>
                      </table>
                    </div>
                }
                {/* /Table */}
              </div>
            </div>
          </div>

          <div className="modal fade" id="payout_modal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4>Payout Setting</h4>
                  <span className="modal-close">
                    <Link to="#" data-bs-dismiss="modal" aria-label="Close">
                      <i className="fa fa-times orange-text" />
                    </Link>
                  </span>
                </div>
                <div className="modal-body">
                  <div className="modal-info">
                    <h5>Payout Methods</h5>
                    <div className="payout-method-option">
                      <div className="d-flex align-items-center">
                        <div className="payout-icon">
                          <img src={bank_line} alt="icon" />
                        </div>
                        <div className="payout-method-content">
                          <h5>Bank Transfer</h5>
                          <p className="mb-0">Connect your bank account</p>
                        </div>
                      </div>
                      <Link className="badge badge-paid">
                        <span>Connect</span>
                      </Link>
                    </div>
                    <div className="payout-method-option">
                      <div className="d-flex align-items-center">
                        <div className="payout-icon">
                          <img src={paypal_line} alt="icon" />
                        </div>
                        <div className="payout-method-content">
                          <h5>Paypal</h5>
                          <p className="mb-0">Connect your Paypal account</p>
                        </div>
                      </div>
                      <Link className="badge badge-paid">
                        <span>Connect</span>
                      </Link>
                    </div>
                  </div>
                  <form action="#">
                    <div className="submit-section text-end">
                      <Link
                        data-bs-dismiss="modal"
                        className="btn btn-cancel submit-btn"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        className="btn btn-primary submit-btn"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </>
  );
};
export default FreelancerAppliedProject;
