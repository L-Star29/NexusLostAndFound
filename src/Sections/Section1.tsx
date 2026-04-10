import './Sections.css';

function Section1() {
  return (
    <div className='section1'>
        
        {/*Header of section */}
        <h1>
          How It Works
        </h1>

        {/*Main Cards of section */}
        <div className='boxes'>
            <div className='howitworksbox orangebox'>
                <div className="orange-overlay">
                    <div className="eb-header-text">
                        <svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        <h2>Search an Item</h2>
                    </div>
                    <ul>
                        <li>Quickly search for your lost items using filters and categories.</li>
                        <li>Found something? Fill out a simple form to report it.</li>
                        <li>Add details and an image to help others identify it easily.</li>
                        <li>Everything is organized in one place for easy access.</li>

                    </ul>
                </div>
            </div>

            <div className='howitworksbox bluebox'>
                <div className="blue-overlay">
                    <div className="eb-header-text">
                        <svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 10C14 9.44771 13.5523 9 13 9H12.5C9.46243 9 7 11.4624 7 14.5C7 17.5376 9.46243 20 12.5 20H17.5C20.5376 20 23 17.5376 23 14.5C23 12.0091 21.3441 9.90488 19.073 9.22823C18.5098 9.06042 18 9.52887 18 10.1166V10.1683C18 10.6659 18.3745 11.0735 18.8345 11.2634C20.1055 11.788 21 13.0395 21 14.5C21 16.433 19.433 18 17.5 18H12.5C10.567 18 9 16.433 9 14.5C9 12.567 10.567 11 12.5 11H13C13.5523 11 14 10.5523 14 10Z" fill="#ffffff"></path> <path d="M11.5 4C14.5376 4 17 6.46243 17 9.5C17 12.5376 14.5376 15 11.5 15H11C10.4477 15 10 14.5523 10 14C10 13.4477 10.4477 13 11 13H11.5C13.433 13 15 11.433 15 9.5C15 7.567 13.433 6 11.5 6H6.5C4.567 6 3 7.567 3 9.5C3 10.9605 3.89451 12.212 5.16553 12.7366C5.62548 12.9264 6 13.3341 6 13.8317V13.8834C6 14.4711 5.49024 14.9396 4.92699 14.7718C2.65592 14.0951 1 11.9909 1 9.5C1 6.46243 3.46243 4 6.5 4H11.5Z" fill="#ffffff"></path> </g></svg>
                        <h2>Match and Verify</h2>
                    </div>
                    <ul>
                        <li>Review item details to see if it matches what you lost.</li>
                        <li>Submit a claim request with identifying information.</li>
                        <li>Our system helps ensure items go to the rightful owner.</li>
                        <li>Prevent false claims with a simple verification process.</li>

                    </ul>
                </div>
            </div>
            
            <div className='howitworksbox orangebox'>
                <div className="orange-overlay">
                    <div className="eb-header-text">
                        <svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 7.02036C1.25 4.40946 3.30359 2.25 5.88889 2.25H18.1111C20.6964 2.25 22.75 4.40946 22.75 7.02036C22.75 9.0483 21.5139 10.8004 19.75 11.4846V16.052C19.75 16.3624 19.75 16.655 19.7467 16.9295C19.7489 16.9527 19.75 16.9762 19.75 17C19.75 17.0314 19.7481 17.0623 19.7443 17.0927C19.7363 17.5455 19.7169 17.9464 19.6701 18.2945C19.5857 18.9223 19.4 19.4891 18.9445 19.9445C18.4891 20.4 17.9223 20.5857 17.2945 20.6701C16.6997 20.7501 15.9505 20.75 15.052 20.75H8.94801C8.04952 20.75 7.3003 20.7501 6.70552 20.6701C6.07773 20.5857 5.51093 20.4 5.05546 19.9445C4.59999 19.4891 4.41432 18.9223 4.32991 18.2945C4.28312 17.9464 4.26371 17.5455 4.25567 17.0927C4.25193 17.0623 4.25 17.0314 4.25 17C4.25 16.9762 4.25111 16.9527 4.25327 16.9295C4.24998 16.655 4.24999 16.3624 4.25 16.052L4.25 11.4846C2.48614 10.8004 1.25 9.0483 1.25 7.02036ZM4.25001 9.80955C4.25018 8.9723 4.25409 8.26948 4.32991 7.70552C4.41432 7.07773 4.59999 6.51093 5.05546 6.05546C5.51093 5.59999 6.07773 5.41432 6.70552 5.32991C7.3003 5.24994 8.04952 5.24997 8.948 5.25H15.052C15.9505 5.24997 16.6997 5.24994 17.2945 5.32991C17.9223 5.41432 18.4891 5.59999 18.9445 6.05546C19.4 6.51093 19.5857 7.07773 19.6701 7.70552C19.7459 8.26948 19.7498 8.9723 19.75 9.80954C20.6439 9.23798 21.25 8.21032 21.25 7.02036C21.25 5.19049 19.8214 3.75 18.1111 3.75H5.88889C4.17864 3.75 2.75 5.19049 2.75 7.02036C2.75 8.21032 3.35611 9.23799 4.25001 9.80955ZM11.25 6.75H9C8.03599 6.75 7.38843 6.75159 6.90539 6.81653C6.44393 6.87858 6.24643 6.9858 6.11612 7.11612C5.9858 7.24643 5.87858 7.44393 5.81653 7.90539C5.75159 8.38843 5.75 9.03599 5.75 10V16C5.75 16.0858 5.75001 16.1691 5.75008 16.25H18.2499C18.25 16.1691 18.25 16.0858 18.25 16V10C18.25 9.03599 18.2484 8.38843 18.1835 7.90539C18.1214 7.44393 18.0142 7.24643 17.8839 7.11612C17.7536 6.9858 17.5561 6.87858 17.0946 6.81653C16.6116 6.75159 15.964 6.75 15 6.75H12.75V10.9726L13.4306 10.1786C13.7001 9.86408 14.1736 9.82766 14.4881 10.0972C14.8026 10.3668 14.839 10.8403 14.5694 11.1548L12.5694 13.4881C12.427 13.6543 12.2189 13.75 12 13.75C11.7811 13.75 11.573 13.6543 11.4306 13.4881L9.43056 11.1548C9.16099 10.8403 9.19741 10.3668 9.51191 10.0972C9.8264 9.82766 10.2999 9.86408 10.5694 10.1786L11.25 10.9726V6.75ZM18.2178 17.75H5.78219C5.79101 17.8739 5.80224 17.9883 5.81653 18.0946C5.87858 18.5561 5.9858 18.7536 6.11612 18.8839C6.24643 19.0142 6.44393 19.1214 6.90539 19.1835C7.38843 19.2484 8.03599 19.25 9 19.25H15C15.964 19.25 16.6116 19.2484 17.0946 19.1835C17.5561 19.1214 17.7536 19.0142 17.8839 18.8839C18.0142 18.7536 18.1214 18.5561 18.1835 18.0946C18.1978 17.9883 18.209 17.8739 18.2178 17.75Z" fill="#fff"></path> </g></svg>
                        <h2>Claim and Retrieve</h2>
                    </div>
                    <ul>
                        <li>Once verified, receive instructions on where to pick up your item.</li>
                        <li>Coordinate with staff or the finder for a smooth return.</li>
                        <li>No confusion, as everything is clearly communicated through the platform.</li>
                        <li>Get your belongings back quickly, securly, and hassle-free.</li>

                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Section1;
