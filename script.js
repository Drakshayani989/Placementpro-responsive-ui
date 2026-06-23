/**
 * PLACEMENTPRO SYSTEM - BUSINESS ENGINE CODE ARCHITECTURE
 * PLATFORM MECHANICS: Functional Router Integration + CRUD Engine Sync Maps
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LOCAL DATA MATRIX MANAGEMENT COMPONENT ---
    // Extract saved tracker profiles list or build brand-new data storage runtime space logs
    let applications = JSON.parse(localStorage.getItem('placementpro_marketing_apps')) || [];

    // --- 2. DOM WORKSPACE SELECTOR ATTACHMENTS MAP REGISTER ---
    const dom = {
        // App Core View Router Switches Hooks
        landingView: document.getElementById('landing-page-view'),
        workspaceView: document.getElementById('app-workspace-view'),
        btnLaunchNav: document.getElementById('btn-launch-nav'),
        btnHeroStart: document.getElementById('btn-hero-start'),
        navLogo: document.getElementById('nav-logo'),
        lnkFeatures: document.getElementById('lnk-features'),

        // Interactive Tracking Core Input Form Elements Nodes
        appForm: document.getElementById('app-form'),
        companyInput: document.getElementById('company-name'),
        roleInput: document.getElementById('job-role'),
        statusSelect: document.getElementById('job-status'),

        // Display Repeater Output targets and UI containers
        appsContainer: document.getElementById('apps-container'),
        searchInput: document.getElementById('search-input'),
        emptyState: document.getElementById('empty-state'),

        // Metrics Summary Text Elements Counter Nodes
        totalApps: document.getElementById('total-apps'),
        totalSelected: document.getElementById('total-selected'),
        totalRejected: document.getElementById('total-rejected')
    };

    // --- 3. COHESIVE FRAME VIEW NAVIGATION ROUTER LOGIC ---
    // Smooth navigation control toggles switching layout interfaces instantly when action targets resolve triggers
    function displayWorkspaceView(event) {
        if (event) event.preventDefault();
        
        // Alter view visibilities tags states structures
        dom.landingView.classList.add('hidden');
        dom.workspaceView.classList.remove('hidden');
        
        // Scroll user viewport view window layout configurations smoothly directly into tracking panel workspace
        document.getElementById('app-anchor').scrollIntoView({ behavior: 'smooth' });
    }

    function displayHomeLandingView(event) {
        event.preventDefault();
        dom.workspaceView.classList.add('hidden');
        dom.landingView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Attach runtime switch routing triggers listeners
    dom.btnLaunchNav.addEventListener('click', displayWorkspaceView);
    dom.btnHeroStart.addEventListener('click', displayWorkspaceView);
    dom.navLogo.addEventListener('click', displayHomeLandingView);
    
    dom.lnkFeatures.addEventListener('click', (e) => {
        // Allow fallback features to bounce back up to landing if viewing active workspace parameters maps
        if (dom.landingView.classList.contains('hidden')) {
            e.preventDefault();
            dom.workspaceView.classList.add('hidden');
            dom.landingView.classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('features-anchor').scrollIntoView({ behavior: 'smooth' });
            }, 50);
        }
    });

    // --- 4. DATA COMPILATION PIPELINE MATHEMATICAL KPI SUMMARY LOGIC ---
    function computeSummaryMetricsCounters() {
        const totalCount = applications.length;
        const selectedCount = applications.filter(item => item.status === 'Selected').length;
        const rejectedCount = applications.filter(item => item.status === 'Rejected').length;

        // Render values live onto target counter text interfaces nodes elements properties layout
        dom.totalApps.textContent = totalCount;
        dom.totalSelected.textContent = selectedCount;
        dom.totalRejected.textContent = rejectedCount;
    }

    // --- 5. INTERACTIVE LIVE COMPONENT GENERATOR PIPELINE ---
    function renderApplicationsTrackerPipeline(searchFilterString = '') {
        // Clear old markup cache references data pools elements to clean up processing space
        dom.appsContainer.innerHTML = '';

        // Extract targeted array subset processing operations conditions
        const executionMatchesSubset = applications.filter(app => 
            app.companyName.toLowerCase().includes(searchFilterString.toLowerCase())
        );

        // Manage fallback layouts markers visibility structures maps conditional constraints
        if (executionMatchesSubset.length === 0) {
            dom.emptyState.classList.remove('hidden');
        } else {
            dom.emptyState.classList.add('hidden');
        }

        // Loop array data records tracking items components strings rendering routines templates matches loops
        executionMatchesSubset.forEach(app => {
            const cardUIWrapperNode = document.createElement('div');
            cardUIWrapperNode.className = 'app-card';
            
            const CSSStatusClassToken = app.status.toLowerCase();

            cardUIWrapperNode.innerHTML = `
                <div class="app-card-details">
                    <h4>${escapeSanitizeHTMLTokens(app.companyName)}</h4>
                    <p>${escapeSanitizeHTMLTokens(app.roleName)}</p>
                </div>
                <div class="app-card-actions">
                    <span class="badge badge-${CSSStatusClassToken}">${app.status}</span>
                    <button class="btn-delete" data-record-id="${app.id}">Delete</button>
                </div>
            `;

            // Setup programmatic targeted click events deletion trigger routing mappings explicitly instead of using global lexical window scopes inline actions
            cardUIWrapperNode.querySelector('.btn-delete').addEventListener('click', (e) => {
                const requestedId = e.target.getAttribute('data-record-id');
                executeDeleteTransactionRecord(requestedId);
            });

            dom.appsContainer.appendChild(cardUIWrapperNode);
        });
    }

    // --- 6. ADD APPLICATION LOG CREATION TRANSACTION ENGINE ---
    dom.appForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const cleanCompanyString = dom.companyInput.value.trim();
        const cleanRoleString = dom.roleInput.value.trim();
        const targetedStatusToken = dom.statusSelect.value;

        if (!cleanCompanyString || !cleanRoleString || !targetedStatusToken) return;

        // Instantiate next structured framework item entity mapping specifications configurations data profiles lookup maps
        const nextApplicationEntry = {
            id: 'track_idx_' + Date.now() + Math.random().toString(36).substring(2, 5),
            companyName: cleanCompanyString,
            roleName: cleanRoleString,
            status: targetedStatusToken
        };

        applications.push(nextApplicationEntry);
        synchronizeApplicationDatabaseMemoryContext();
        
        // Reset form inputs parameters properties interface variables fields
        dom.appForm.reset();
        dom.searchInput.value = ''; // Reset standard input searches layouts targets parameters

        executeGlobalWorkspaceUIRefreshSequence();
    });

    // --- 7. DISCARD TRASH PROCESSING DELETE OPERATION LOGIC ---
    function executeDeleteTransactionRecord(targetIdIndexToken) {
        applications = applications.filter(item => item.id !== targetIdIndexToken);
        synchronizeApplicationDatabaseMemoryContext();
        executeGlobalWorkspaceUIRefreshSequence(dom.searchInput.value);
    }

    // --- 8. INSTANT LIVE INPUT ENGINES SEARCH TRIGGERS ATTACHMENTS HOOKS ---
    dom.searchInput.addEventListener('input', (e) => {
        const ongoingSearchInputQueryString = e.target.value;
        renderApplicationsTrackerPipeline(ongoingSearchInputQueryString);
    });

    // --- 9. LOCAL PERSISTENT REPOSITORIES UTILITY LOGS SYNC ARCHITECTURES ---
    function synchronizeApplicationDatabaseMemoryContext() {
        localStorage.setItem('placementpro_marketing_apps', JSON.stringify(applications));
    }

    function executeGlobalWorkspaceUIRefreshSequence(searchPlaceholderStringKey = '') {
        computeSummaryMetricsCounters();
        renderApplicationsTrackerPipeline(searchPlaceholderStringKey);
    }

    // Anti-Cross Site Injection Token Sanitation Processing Utility Wrapper Method
    function escapeSanitizeHTMLTokens(inputRawStringValue) {
        return inputRawStringValue.replace(/[&<>'"]/g, matchTokenElement => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[matchTokenElement] || matchTokenElement));
    }

    // --- 10. APP RUNTIME INITIALIZATION SEED BOOTSTRAPPING KICKSTART ---
    // Populate stats and active card logs pipelines layout arrays parameters models instantly on screen initialization boot loops
    executeGlobalWorkspaceUIRefreshSequence();
});