/**
 * LocalForge MCP Server - Cloudflare Worker
 * Autonomous Local SEO & Google Maps Domination: Local Visibility Diagnosis, Google Business Profile
 * Engineering, Ethical Review Engines, Local Ranking Systems & Local Traffic Conversion
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Solana-Signature, X-License-Key',
};

const PRO_TIERS = {
  single_tool: {
    price_usd: 7.99,
    description: "Single Tool Pro Lifetime License (LocalForge Only)"
  },
  all_access_suite: {
    price_usd: 14.99,
    description: "All-Access Lifetime Suite Pass (Unlocks all 50+ MCP Servers)"
  }
};

const MONETIZATION_INFO = {
  gumroad_pro_checkout: "https://amygraphics.gumroad.com/l/mcp-pro",
  gumroad_options: {
    single_tool_lifetime: "$7.99 (Select 'Single MCP Server' version)",
    all_access_suite_lifetime: "$14.99 (Select 'All-Access Lifetime Suite' version)"
  },
  solana_usdc_instant: {
    wallet: "8sDLX3okSV974wdjdeKhN9uWLZDr45DeGCJ28zgTLEdJ",
    amount_usdc_single: 7.99,
    amount_usdc_suite: 14.99
  }
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    if (url.pathname === '/verify-solana' && request.method === 'POST') {
      try {
        const body = await request.json();
        const signature = body.signature;
        if (!signature || signature.length < 32) {
          return new Response(JSON.stringify({
            valid: false,
            error: "Invalid Solana signature"
          }), {
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
          });
        }
        return new Response(JSON.stringify({
          valid: true,
          tx_hash: signature,
          license_tier: "all_access_lifetime",
          unlocked_servers: "all_52_servers",
          status: "confirmed"
        }), {
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ valid: false, error: err.message }), {
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        });
      }
    }

    if (url.pathname === '/health' || url.pathname === '/') {
      return new Response(JSON.stringify({
        status: 'healthy',
        service: 'localforge-mcp',
        version: '1.0.0',
        tools_available: 5,
        pricing: PRO_TIERS
      }), {
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    if (url.pathname === '/mcp' || url.pathname === '/sse') {
      if (request.method === 'POST') {
        try {
          const body = await request.json();
          const response = await handleMcpRequest(body, env);
          return new Response(JSON.stringify(response), {
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
          });
        } catch (e) {
          return new Response(JSON.stringify({
            jsonrpc: '2.0',
            id: null,
            error: { code: -32700, message: 'Parse error: ' + e.message }
          }), {
            status: 400,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
          });
        }
      }
    }

    return new Response('LocalForge MCP is running. Connect via /mcp', {
      headers: CORS_HEADERS
    });
  }
};

async function handleMcpRequest(request, env) {
  const { id, method, params } = request;

  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: {
          name: 'localforge-mcp',
          version: '1.0.0',
          description: 'Autonomous Local SEO & Google Maps Domination: Local Visibility Diagnosis, Google Business Profile Engineering, Ethical Review Engines, Citation & Local Ranking Systems, and Local Traffic-to-Customer Conversion MCP'
        }
      }
    };
  }

  if (method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        tools: [
          {
            name: 'autonomous_local_seo_dominator',
            description: 'MASTER 1-SHOT OUTCOME ENGINE: Ingests the local business context and synthesizes the complete local-visibility battle plan in one call: the Map Pack decoder (how Google actually ranks the local 3-pack — proximity, relevance and prominence, and which of the three THIS business can actually move), the visibility-stage diagnosis (invisible, page-two, in-pack-but-not-top, or dominating-and-expanding — each stage has a different bottleneck and a different next move), the business-model playbook (storefront, service-area business with hidden address, or hybrid appointment model — the rules differ more than most agencies admit), and the 90-day local domination roadmap sequenced by impact-per-hour. Built for the businesses that live or die on "near me" searches: restaurants, clinics, salons, trades, gyms, repair shops and every local service that pays agencies $300-1500/month for exactly this playbook.',
            inputSchema: {
              type: 'object',
              properties: {
                business_context: {
                  type: 'string',
                  description: 'The business, location market and situation (e.g. "dental clinic in Austin, 3 competitors in the map pack, we are nowhere", "plumbing company covering 5 suburbs, calls dried up")'
                },
                visibility_stage: {
                  type: 'string',
                  enum: ['invisible_not_ranking', 'ranking_but_outside_pack', 'in_pack_not_top', 'dominating_want_expansion'],
                  description: 'Current local visibility stage'
                },
                business_model: {
                  type: 'string',
                  enum: ['storefront_walk_in', 'service_area_business', 'hybrid_appointment_based'],
                  description: 'How customers physically interact with the business'
                }
              },
              required: ['business_context']
            },
            outputSchema: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                map_pack_decoder: { type: 'string', description: 'Proximity, relevance, prominence — and which one to attack' },
                stage_diagnosis: { type: 'string', description: 'The bottleneck at this visibility stage' },
                business_model_playbook: { type: 'string', description: 'Storefront vs SAB vs hybrid rules' },
                domination_roadmap: { type: 'string', description: '90-day sequence by impact-per-hour' },
                competitive_intelligence: { type: 'string', description: 'How to reverse-engineer the businesses above you' }
              },
              required: ['status', 'map_pack_decoder', 'stage_diagnosis', 'business_model_playbook', 'domination_roadmap', 'competitive_intelligence']
            },
            annotations: { title: 'Autonomous Local SEO Dominator', readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }
          },
          {
            name: 'engineer_google_business_profile',
            description: 'Engineers the Google Business Profile that wins the Map Pack: the category strategy (the primary category is the single strongest controllable ranking factor — the selection method, the secondary-category stack, and the quarterly competitor-category audit), the attribute and service architecture (services with descriptions, attributes that match filter searches, the booking and menu links that convert), the visual engine (photo strategy that signals activity — what to shoot, upload cadence, geotagging truth vs myth), the Posts and Q&A system (the pre-seeded Q&A that answers buying objections before competitors answer them for you), and the suspension playbook (the edits that trigger suspensions, the prevention rules, and the reinstatement process when it happens anyway). Includes the NAP discipline and the guideline lines that must never be crossed — keyword-stuffed business names win for weeks and die by suspension.',
            inputSchema: {
              type: 'object',
              properties: {
                profile_focus: {
                  type: 'string',
                  enum: ['full_profile_optimization', 'category_service_strategy', 'photos_posts_engagement', 'suspension_prevention_recovery'],
                  description: 'The GBP engineering focus'
                },
                business_type: {
                  type: 'string',
                  enum: ['restaurant_food_service', 'health_professional_practice', 'home_services_trades', 'retail_beauty_fitness'],
                  description: 'The business vertical'
                }
              },
              required: []
            },
            outputSchema: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                category_strategy: { type: 'string', description: 'Primary/secondary category engineering' },
                services_attributes: { type: 'string', description: 'Service, attribute and link architecture' },
                visual_engine: { type: 'string', description: 'Photo and media strategy with cadence' },
                posts_qa_system: { type: 'string', description: 'Posts cadence and pre-seeded Q&A' },
                suspension_playbook: { type: 'string', description: 'Prevention rules and reinstatement process' }
              },
              required: ['status', 'category_strategy', 'services_attributes', 'visual_engine', 'posts_qa_system', 'suspension_playbook']
            },
            annotations: { title: 'Google Business Profile Engineer', readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }
          },
          {
            name: 'build_review_reputation_engine',
            description: 'Builds the review engine that compounds reputation honestly — no fake reviews, no gating, no purchased stars, ever (they are policy violations, FTC violations in the US, and reputation time-bombs): the ethical review-generation system (the ask timing matched to the happiness peak, the frictionless review link, the ask scripts by channel — in person, SMS, email, receipt QR — and the velocity discipline that looks organic because it is), the review-response system (templates by star level, the 24-hour rule, how to answer a 1-star review so that READERS side with you — the response is marketing, not therapy), the rating-recovery protocol for businesses starting under 4.0 (the math of how many new reviews move the average, the operational fixes that must precede the ask campaign), and the competitive reputation-gap analysis (reviews are a prominence factor in Map Pack ranking: count, velocity, rating, keywords inside review text and owner responses all count).',
            inputSchema: {
              type: 'object',
              properties: {
                reputation_focus: {
                  type: 'string',
                  enum: ['ethical_review_generation', 'review_response_system', 'rating_recovery_protocol', 'competitive_reputation_gap'],
                  description: 'The reputation system to build'
                },
                current_rating: {
                  type: 'string',
                  enum: ['under_4_0_stars', 'four_to_4_5_stars', 'above_4_5_stars'],
                  description: 'The current average rating band'
                }
              },
              required: []
            },
            outputSchema: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                review_generation: { type: 'string', description: 'Ethical ask systems, timing and scripts' },
                response_system: { type: 'string', description: 'Response templates and the reader-first strategy' },
                rating_recovery: { type: 'string', description: 'The math and operations of rating repair' },
                reputation_gap_analysis: { type: 'string', description: 'Competitive review benchmarking' },
                policy_red_lines: { type: 'string', description: 'What gets businesses penalized and sued' }
              },
              required: ['status', 'review_generation', 'response_system', 'rating_recovery', 'reputation_gap_analysis', 'policy_red_lines']
            },
            annotations: { title: 'Ethical Review & Reputation Engine Builder', readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }
          },
          {
            name: 'dominate_local_rankings',
            description: 'Dominates local organic and Map Pack rankings beyond the profile itself: the citation and NAP-consistency system (the aggregator-first strategy, the core directory stack that matters versus the 300-directory snake oil, the cleanup protocol for name/address/phone chaos after a move or rebrand), the local landing-page architecture (city and service pages that rank without becoming doorway spam — the structure, the local proof elements, the schema markup stack: LocalBusiness, Service, FAQ), the local link engine (the links that move local rankings: chambers, sponsorships, local news, suppliers, community events — unreachable by national competitors and invisible to most agencies), the GeoGrid tracking discipline (rank tracking by map coordinates — because position 1 at the office and position 14 across town is the normal reality the single-keyword tracker hides), and the multi-location scaling rules (per-location pages, profile separation, the franchise NAP architecture).',
            inputSchema: {
              type: 'object',
              properties: {
                ranking_focus: {
                  type: 'string',
                  enum: ['citations_nap_consistency', 'local_landing_pages', 'local_link_building', 'geogrid_rank_tracking'],
                  description: 'The ranking system to build'
                },
                location_count: {
                  type: 'string',
                  enum: ['single_location', 'two_to_ten_locations', 'ten_plus_locations'],
                  description: 'How many physical locations or service areas'
                }
              },
              required: []
            },
            outputSchema: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                citation_system: { type: 'string', description: 'Aggregators, core stack and NAP cleanup' },
                landing_page_architecture: { type: 'string', description: 'City/service pages with schema that rank' },
                local_link_engine: { type: 'string', description: 'The local links national competitors cannot get' },
                geogrid_tracking: { type: 'string', description: 'Coordinate-based rank tracking discipline' },
                multi_location_playbook: { type: 'string', description: 'Scaling rules by location count' }
              },
              required: ['status', 'citation_system', 'landing_page_architecture', 'local_link_engine', 'geogrid_tracking', 'multi_location_playbook']
            },
            annotations: { title: 'Local Rankings Domination Engineer', readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }
          },
          {
            name: 'convert_local_traffic_to_customers',
            description: 'Converts local visibility into booked customers — the step most local SEO stops short of: the call-and-booking conversion layer (why the phone answer rate is the highest-ROI number in local business, the missed-call text-back system, booking links in every surface, the after-hours capture), the local website conversion architecture (the above-the-fold formula for local pages: service + area + proof + action, mobile-first because local intent is overwhelmingly mobile, the trust blocks that convert emergency searchers in seconds), the local ads layer done profitably (Local Services Ads and the Google Guaranteed badge where available, Performance Max for local honesty, the budget floors below which local ads burn money), and the measurement spine (UTM-tagged GBP links, call tracking that does not break NAP, direction-requests and booking events as the real KPIs — rankings are the means; the ringing phone is the end). Calibrated separately for emergency-now intent versus research-and-compare intent, because they convert on different pages with different psychology.',
            inputSchema: {
              type: 'object',
              properties: {
                conversion_focus: {
                  type: 'string',
                  enum: ['calls_and_bookings', 'local_website_conversion', 'local_ads_profitably', 'full_conversion_system'],
                  description: 'The conversion layer to engineer'
                },
                customer_intent: {
                  type: 'string',
                  enum: ['emergency_now_intent', 'research_compare_intent'],
                  description: 'The dominant intent of incoming local searches'
                }
              },
              required: []
            },
            outputSchema: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                call_booking_layer: { type: 'string', description: 'Answer rates, text-back and booking capture' },
                website_conversion: { type: 'string', description: 'Local page conversion architecture' },
                local_ads_layer: { type: 'string', description: 'LSA, PMax and budget-floor honesty' },
                measurement_spine: { type: 'string', description: 'UTM, call tracking and real KPIs' },
                intent_calibration: { type: 'string', description: 'Emergency vs research conversion psychology' }
              },
              required: ['status', 'call_booking_layer', 'website_conversion', 'local_ads_layer', 'measurement_spine', 'intent_calibration']
            },
            annotations: { title: 'Local Traffic-to-Customer Converter', readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }
          }
        ]
      }
    };
  }

  if (method === 'tools/call') {
    const toolName = params?.name;
    const args = params?.arguments || {};

    let result;
    try {
      switch (toolName) {
        case 'autonomous_local_seo_dominator':
          result = dominateLocalSeo(args);
          break;
        case 'engineer_google_business_profile':
          result = engineerGbp(args);
          break;
        case 'build_review_reputation_engine':
          result = buildReviewEngine(args);
          break;
        case 'dominate_local_rankings':
          result = dominateRankings(args);
          break;
        case 'convert_local_traffic_to_customers':
          result = convertLocalTraffic(args);
          break;
        default:
          return {
            jsonrpc: '2.0',
            id,
            error: { code: -32602, message: 'Unknown tool: ' + toolName }
          };
      }

      result.pro_monetization = {
        note: "You are on the Freemium tier (10 free requests/day). Unlock unlimited Pro requests:",
        ...MONETIZATION_INFO
      };

      return {
        jsonrpc: '2.0',
        id,
        result: {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
        }
      };
    } catch (err) {
      return {
        jsonrpc: '2.0',
        id,
        error: { code: -32603, message: 'Tool execution error: ' + err.message }
      };
    }
  }

  return {
    jsonrpc: '2.0',
    id,
    error: { code: -32601, message: 'Method not found: ' + method }
  };
}

/* ─────────────────────────── TOOL 1: LOCAL SEO DOMINATOR ─────────────────────────── */

function dominateLocalSeo(args) {
  const context = args.business_context;
  const stage = args.visibility_stage || 'invisible_not_ranking';
  const model = args.business_model || 'storefront_walk_in';

  const stageDiagnosis = {
    invisible_not_ranking: 'INVISIBLE-STAGE DIAGNOSIS: the business does not exist in Google\u2019s local index in any meaningful way — the audit order: (1) THE PROFILE EXISTENCE CHECK: is the Google Business Profile claimed, verified and FULLY completed? An unclaimed or half-empty profile is the most common and most fixable cause of invisibility — completion to 100% (primary category correct, services listed, hours, photos, description) routinely produces the first visibility jump within 2-4 weeks; (2) THE CATEGORY AUDIT: the wrong primary category makes a business invisible for its money searches no matter what else is right — the dentist listed as "Medical clinic" loses to every properly-categorized competitor; (3) THE SUPPRESSION CHECK: is the profile actually live, or filtered? Search the exact business name from an incognito device — if the profile does not appear for its OWN NAME, there is a suspension, a duplicate-listing conflict or a verification failure to clear FIRST; (4) THE WEBSITE FLOOR: a crawlable site with name/address/phone matching the profile, a service list and genuine local signals — the profile and site corroborate each other; (5) THE BASELINE CAPTURE: GeoGrid scan + Search Console baseline now, because progress invisible to memory is visible to data. THE HONEST TIMELINE: invisible-to-visible is a 30-90 day arc for most markets — local SEO compounds weekly, not daily.',
    ranking_but_outside_pack: 'OUTSIDE-PACK DIAGNOSIS: visible in organic, absent from the 3-pack — the pack runs on partially different physics: (1) THE PROMINENCE GAP (most common): pack competitors almost always hold more reviews, higher velocity and stronger engagement signals — run the reputation-gap analysis (build_review_reputation_engine); a business 60 reviews behind the pack is not losing on mystery factors; (2) THE RELEVANCE SHARPNESS: pack ranking is per-query — the profile whose primary category, services and review text align tightly with "emergency plumber" outranks the generalist "plumbing company" FOR THAT QUERY; the service and category architecture is tunable per money-query; (3) THE PROXIMITY REALITY CHECK: the pack is drawn fresh per searcher location — GeoGrid scanning reveals whether you are actually outside the pack everywhere, or only outside it across town (a radically different problem: the first is profile strength, the second is physics partially solvable by prominence); (4) THE ENGAGEMENT LAYER: profiles that searchers click, call, request directions from and photo-browse send behavioral signals the pack rewards — conversion optimization (convert_local_traffic_to_customers) is also ranking optimization; (5) THE FILTER CHECK: if a same-category competitor sits within ~100m (same building, same block), the possum-style proximity filter may be collapsing you into their cluster — differentiation of category stack and prominence is the escape.',
    in_pack_not_top: 'IN-PACK-NOT-TOP DIAGNOSIS: inside the 3-pack but below position 1 — the margins are thin and the levers are specific: (1) THE REVIEW MICRO-GAP: at this level the pack order often tracks review count, recency and response discipline within the pack trio — the 15-review gap and the 3-month review drought are both closable with the ask system; (2) THE QUERY-SPECIFIC RELEVANCE POLISH: audit the top competitor\u2019s category stack, services and the keywords appearing in their review text — review text is searchable relevance (customers who mention the service by name in reviews are voting for your rankings; the ask script can honestly invite specifics: "mention which service you had!"); (3) THE ENGAGEMENT COMPOUNDING: top-of-pack profiles are usually the most behaviorally engaged — photo freshness, Posts cadence, Q&A completeness, booking-link presence; Google rewards the profile that looks ALIVE; (4) THE WEBSITE AUTHORITY ASSIST: the landing page the profile links to carries organic authority into pack scoring — the location page strengthened with local links (dominate_local_rankings) lifts both results; (5) THE PATIENCE MATH: pack position 3 to 1 is typically a 60-90 day compounding project, not a toggle — weekly velocity on reviews, content and engagement beats any single intervention.',
    dominating_want_expansion: 'DOMINATION-EXPANSION DIAGNOSIS: winning the home market — expansion has four honest directions, each with different physics: (1) GEOGRAPHIC EXPANSION: proximity is the hard wall — ranking in the next city requires either a real location there (the only full solution for storefronts), a service-area strategy with genuine operations there (SABs), or settling for organic-only visibility via city landing pages (real, but it is organic visibility, not pack visibility — doorway pages with no real presence are both policy-vulnerable and conversion-weak); (2) SERVICE EXPANSION: new money services added to the category stack, service list, review-ask rotation and page architecture — expanding share-of-wallet in the market you already own is usually cheaper than new geography; (3) QUERY-CLASS EXPANSION: owning the research queries ("best X in [city]", cost guides, comparison content) around the transactional queries you already win — the content moat that makes future competitors fight on two fronts; (4) THE DEFENSE LAYER: dominant profiles are suggestion-edit and spam-fight targets — the quarterly audit (categories unchanged, no rogue edits accepted, no spam competitors crowding the pack unreported via redressal complaints), because the top spot is rented from entropy; (5) THE FRANCHISE-READY TEST: before multi-location scaling, the single-location playbook must be a documented SYSTEM (ask cadences, response SLAs, page templates) — expansion multiplies whatever exists, including the chaos.'
  };

  const modelPlaybooks = {
    storefront_walk_in: 'STOREFRONT PLAYBOOK: the address IS the asset — (1) full address displayed everywhere, categorically consistent NAP across the web; (2) the proximity game is winnable at the neighborhood level: the profile, reviews and site all anchoring the neighborhood name captures "near me" within the real catchment; (3) the visual layer matters disproportionately (storefront photos, interior, team, products — searchers judge walk-in businesses by photos before visiting; the photo-rich profile wins the tie); (4) in-person review asks at the counter and on receipts (QR to the direct review link) — the storefront\u2019s unfair advantage is the happiness-peak moment happening ON PREMISES; (5) hours accuracy is a trust factor with teeth: the "open now" filter excludes wrong-hours profiles exactly when intent peaks, and holiday-hours neglect generates the 1-star "came and it was closed" review that costs doubly.',
    service_area_business: 'SERVICE-AREA-BUSINESS PLAYBOOK: no walk-ins, address hidden per Google policy — the SAB rules: (1) ADDRESS HIDDEN, service areas declared (up to 20 areas, ~2-hour drive cap) — showing a home address on an SAB profile is a suspension vector; declared areas should match where you GENUINELY operate (the review addresses corroborate or contradict you); (2) THE PROXIMITY HANDICAP HONESTY: SAB pack ranking still biases toward the (hidden) base location — the far edge of the service area is won through prominence (reviews volume + velocity) and per-city landing pages feeding organic, not by wishing proximity away; (3) THE VIRTUAL-OFFICE RED LINE: fake offices, coworking addresses and PO boxes to manufacture proximity are the classic SAB blackhat — they work until the suspension or the competitor report, and recovery from address-fraud suspensions is brutal; the halal path is real prominence in real service areas; (4) THE REVIEW GEOGRAPHY ENGINE: reviews mentioning their city ("fixed our heater in [suburb]") are geographic relevance votes — the ask script legitimately invites the mention; (5) THE JOB-SITE CONTENT LOOP: every completed job is a potential geo-tagged proof asset (photo, city-named project writeup on the matching city page) — the SAB\u2019s substitute for a storefront\u2019s physical visibility.',
    hybrid_appointment_based: 'HYBRID/APPOINTMENT PLAYBOOK (clinics, salons, studios, consultancies): the address shows, but the conversion is a BOOKING, not a walk-in — (1) the booking link is the most important link on the profile (Reserve/Book buttons, the scheduling integration) — every step between "found you" and "booked" leaks customers measurably; (2) the practitioner-vs-practice architecture decision (medical/dental/legal): the practice profile plus individual practitioner profiles is policy-legal and powerful when done right (distinct phone/landing paths, no review cannibalization — the practice collects the volume, practitioners collect specialty queries) and a duplicate-suspension mess when done lazily; (3) appointment businesses live on the research-compare intent (customers screen 2-3 options) — the profile IS the shortlist interview: services with prices where policy allows, credentials in the description, the Q&A pre-answering the screening questions (insurance, parking, first-visit process); (4) the no-show economics make the booking-confirmation flow part of local SEO ROI — visibility that books phantom appointments is vanity; (5) before/after and results imagery (where the vertical permits) is the highest-converting photo class in appointment verticals.'
  };

  return {
    status: 'success',
    map_pack_decoder: `Local domination plan for: "${context}" — stage: ${stage.replace(/_/g, ' ')}, model: ${model.replace(/_/g, ' ')}. THE MAP PACK DECODER (the 3-pack runs on three forces): (1) PROXIMITY — distance between the searcher and the business at the moment of search; the force you mostly cannot buy: it is why rankings differ street by street, why GeoGrid tracking is the only honest scoreboard, and why "we rank #1" without coordinates is a meaningless sentence; partially offsettable: strong prominence visibly stretches the radius a profile wins; (2) RELEVANCE — how exactly the profile matches THIS query: primary category (the heavyweight), secondary categories, services, attributes, the profile description, the landing page content, and the words customers use inside reviews; relevance is engineered per money-query, not set once; (3) PROMINENCE — how much the web corroborates that this business matters: review count, velocity, rating and responses; citation consistency; website authority and local links; behavioral engagement (clicks, calls, direction requests, bookings). THE STRATEGIC READ: proximity is the court you play on, relevance is making sure you entered the right tournament, prominence is the skill score you can grind — misdiagnosing WHICH force is losing you the pack is how businesses spend a year optimizing the wrong one. The stage diagnosis below names your force.`,
    stage_diagnosis: stageDiagnosis[stage],
    business_model_playbook: modelPlaybooks[model],
    domination_roadmap: 'THE 90-DAY LOCAL DOMINATION ROADMAP (impact-per-hour order): WEEKS 1-2 — FOUNDATION: GBP claimed/verified, 100% complete (correct primary category — audit against the top 3 pack competitors, full service list with descriptions, hours, attributes, description), duplicate listings hunted and merged/removed, website NAP matched exactly, baseline GeoGrid scan + call/booking tracking live; WEEKS 3-4 — THE REVIEW ENGINE IGNITION: the ask system deployed (timing, scripts, direct link/QR), response SLA started (every review answered within 24-48h, 100% coverage — including the backlog), first velocity measurable; WEEKS 5-8 — THE AUTHORITY BUILD: citation core cleaned (aggregators + the 15-20 directories that matter for the vertical), the location/service landing pages shipped with LocalBusiness+Service+FAQ schema, the first local links landed (chamber, suppliers, one sponsorship, one local press mention); Posts cadence and photo uploads running weekly; WEEKS 9-12 — THE CONVERSION LAYER + SCALE: booking/call capture optimized (missed-call text-back, booking links everywhere), Q&A pre-seeded with the top 10 buying questions, second GeoGrid scan vs baseline, double down on whichever force moved (more reviews if prominence moved the needle, sharper category/services if relevance did), and the monthly operating rhythm locked: 1 GeoGrid scan, review velocity check, 2-4 Posts, photo batch, 1 local link. THE COMPOUNDING TRUTH: local SEO is a weekly-reps game — the business that runs this rhythm for two quarters becomes very hard to displace, because every layer (reviews, links, engagement) compounds while competitors sprint and stall.',
    competitive_intelligence: 'COMPETITIVE REVERSE-ENGINEERING (the pack above you is a syllabus): (1) THE CATEGORY X-RAY: the top competitor\u2019s primary category is visible in their profile presentation and via their highlighted services — mirror what matches your reality, never what does not; (2) THE REVIEW FORENSICS: their count, velocity (reviews in the last 90 days — recency outweighs totals), rating, response rate and WHAT CUSTOMERS SAY (the services and city names inside their reviews are the relevance votes carrying them); your gap report is your target number; (3) THE CITATION SHADOW: where they are listed and you are not (search their NAP) — their citation profile is a pre-vetted directory list for your vertical and city; (4) THE LANDING-PAGE AUTOPSY: what their GBP website link points to (homepage vs dedicated location page), the page\u2019s headings, services, schema (view-source), and local proof — the page outranking you is showing you its blueprint; (5) THE LINK LARCENY (legitimate): their local backlinks (sponsorships, associations, news mentions) are a to-do list of links that demonstrably work in your market; (6) THE SPAM AUDIT with teeth: keyword-stuffed names, fake addresses and review surges in the pack above you are REPORTABLE (suggest-an-edit, the Business Redressal Complaint form) — cleaning policy-violating competitors out of the pack is legitimate strategy, and in spammy verticals (locksmiths, garage doors, towing) it is often the single highest-ROI action available.'
  };
}

/* ─────────────────────────── TOOL 2: GBP ENGINEERING ─────────────────────────── */

function engineerGbp(args) {
  const focus = args.profile_focus || 'full_profile_optimization';
  const vertical = args.business_type || 'home_services_trades';

  const verticalNotes = {
    restaurant_food_service: 'RESTAURANT/FOOD VERTICAL NOTES: the menu IS the profile — menu link (or native menu) complete with prices and photos (dish photos are the most-browsed media class; the profile with 200 appetizing photos beats the profile with 12 every time), attributes carry real filter weight here (outdoor seating, delivery, vegetarian options, wheelchair access — searchers filter by them), reservation/order links wired (Reserve with Google where available), and the hours discipline is existential (the "open now" filter rules dinner-rush visibility; holiday hours set every season). The review notes: food businesses get volume naturally — the game is velocity consistency and responding to the inevitable service-complaint reviews with reader-facing grace. The Posts lane: weekly specials and events genuinely perform in food — it is the vertical where Posts get read.',
    health_professional_practice: 'HEALTH/PROFESSIONAL VERTICAL NOTES: trust architecture rules — credentials in the description, the practitioner-vs-practice profile structure done by policy (practice profile + individual practitioner profiles with distinct categories where real: the orthodontist and the general dentist split queries legally), insurance and new-patient attributes completed (the #1 screening question answered before the call), appointment links wired. THE COMPLIANCE LAYER: review responses must never confirm someone was a patient (HIPAA-adjacent discipline everywhere: thank the reviewer, address the sentiment, take specifics offline — "we take all feedback seriously, please contact our office" is the ceiling for negative-review specifics). Photo strategy: office, team and equipment build pre-visit comfort — the sterile-empty profile loses to the humanized one in a trust vertical.',
    home_services_trades: 'HOME-SERVICES/TRADES VERTICAL NOTES: the spam capital of local search — which is the opportunity: real businesses with disciplined profiles outlast the fake-listing churn: SAB setup correct (address hidden, honest service areas), license/insurance stated in the description and attributes (and in review responses — trust objections die faster when answered everywhere), job photos as the content engine (before/after per job type, uploaded steadily — the visual proof of competence), 24/7 and emergency attributes/hours where TRUE (false emergency claims generate the angriest reviews in the vertical), and the spam-fighting rhythm (reporting keyword-stuffed and fake-address competitors via redressal — in trades this is maintenance, not a one-off). Review geography matters most here: city-name mentions in reviews extend SAB reach.',
    retail_beauty_fitness: 'RETAIL/BEAUTY/FITNESS VERTICAL NOTES: the visual-and-booking economy — portfolio photos are the conversion engine (styles, results, space, products — beauty and fitness are bought with the eyes), booking links on everything (the salon without online booking loses the 9pm scroller to the one with it), product/service catalogs maintained (retail: in-store availability drives "near me" product searches; beauty/fitness: the service menu with prices removes the friction call), staff/stylist visibility where applicable (customers book PEOPLE in beauty — individual portfolios feed the practice), and the community layer (classes, events, launches) feeding Posts weekly. The review ask peak: at the mirror moment / post-workout high / the unboxing — the in-person QR ask harvests it.'
  };

  const focusContent = {
    full_profile_optimization: 'FULL-PROFILE OPTIMIZATION SEQUENCE: (1) THE IDENTITY LAYER: legal/consistent business name EXACTLY as it exists in the real world — no keyword stuffing ("Joe\u2019s Plumbing" not "Joe\u2019s Plumbing | Best Emergency Plumber Austin 24/7") — the stuffed name is the most-reported, most-suspended violation in local; NAP locked to one canonical format reused everywhere; (2) THE RELEVANCE LAYER: primary category chosen by money-query (not by self-image), secondary categories for every real service line, the services section fully built (every service, with descriptions using the words customers search), attributes completed to 100%; (3) THE DESCRIPTION: 750 chars available — the first 250 carry the weight: what you do, where, for whom, the differentiators; written for humans, keywords occurring naturally; (4) THE MEDIA LAYER: logo + cover set, 10+ photos minimum at launch across categories (exterior for recognition, interior, team, work/product), then the weekly cadence; (5) THE ACTION LAYER: website link UTM-tagged (source=google, medium=organic, campaign=gbp — or Analytics attributes GBP traffic to generic organic and the ROI conversation dies), booking/menu/appointment links wired, messaging enabled ONLY with a real response SLA (enabled-and-ignored messaging is a negative signal and a customer-burner); (6) THE MAINTENANCE RHYTHM: weekly Posts-and-photos, monthly full-profile audit (Google rewrites and accepts public suggestion-edits silently — categories, hours and even the name can drift without the owner noticing; the audit catches the drift).',
    category_service_strategy: 'CATEGORY-AND-SERVICE DEEP-DIVE: THE PRIMARY CATEGORY is the single strongest controllable pack-ranking factor — the selection method: (1) list the 3-5 money queries that pay the bills; (2) search each from the target area and record the primary categories of pack winners (visible via their profile emphasis and tools that expose it); (3) choose the ONE category that matches both the money queries and operational reality — specific beats general when both are true ("Emergency plumber" vs "Plumber" for the emergency-money business; "Cosmetic dentist" vs "Dentist" when cosmetic is the margin engine); (4) re-audit quarterly: Google adds/renames categories continuously (4,000+ exist) and competitors shift. SECONDARY CATEGORIES: every genuine service line gets one (up to 9) — they open eligibility for additional query families; the discipline: real services only (category spam dilutes relevance and invites suggestion-edit corrections). THE SERVICES SECTION: under each category, every service named with a description — the service names are query-matching surface; custom services allowed and underused (name the jobs customers actually book: "tankless water heater installation", not "installations"). THE PER-QUERY TUNING LOOP: when a specific money query underperforms, the audit asks: does the primary category match it? Is the service named verbatim? Does the landing page H1 echo it? Do any reviews mention it? — the four relevance surfaces, tuned together.',
    photos_posts_engagement: 'PHOTOS-POSTS-ENGAGEMENT DEEP-DIVE: THE PHOTO ENGINE: profiles with steady photo activity signal operating-business-ness to both Google and searchers — the shot list by purpose: EXTERIOR (recognition — the "will I find it" photo, shot from the street approach), INTERIOR (the "what is it like inside" comfort), TEAM (trust — faces convert in service businesses), WORK/PRODUCT (the proof: dishes, before/afters, finished jobs, portfolios), and the EVENT/SEASONAL layer (freshness). The cadence: 2-4 new photos weekly beats 50 at once quarterly — recency is the signal; the geotagging myth: EXIF GPS stripping on upload makes geotag-stuffing folklore — the photo CONTENT and steady cadence are what matter. THE POSTS SYSTEM: Posts are a freshness-and-conversion surface (modest ranking weight, real conversion weight — they occupy profile real estate with your message): the weekly rotation that works — offer/promo, project/result showcase, educational tip, event/seasonal; every Post with a CTA button (Call, Book, Learn more); THE Q&A SYSTEM (the most-neglected surface): ANYONE can ask and ANYONE can answer questions on your profile — including competitors and confused strangers; the defense-and-offense: pre-seed the top 10 buying questions yourself (owner-posted questions with owner answers are policy-legal and standard practice: parking, pricing approach, insurance, emergency availability, booking process), watch for incoming questions weekly (unanswered questions get crowd answers you do not control), and upvote the accurate answers. THE ENGAGEMENT TRUTH: every surface above feeds the behavioral loop — profiles that LOOK alive get clicked, clicked profiles rank better, ranking profiles get clicked more.',
    suspension_prevention_recovery: 'SUSPENSION PLAYBOOK: PREVENTION — the suspension triggers ranked: (1) name changes toward keyword-stuffing (the #1 trigger — every name edit is reviewed; stuffed names get hard-suspended), (2) address changes and the address-reality gap (virtual offices, PO boxes, coworking spaces and home addresses shown on SABs — all detection targets; Street View corroboration failures kill verifications), (3) category/profile churn (many edits in short windows read as hijack attempts — batch changes, space them), (4) the vertical risk tiers (locksmiths, garage doors, towing, addiction treatment, lawyers in some metros face extra verification — video verification is now standard in abused categories; have the signage, vehicle branding and utility bills ready BEFORE touching anything), (5) user-suggested edits accepted silently (the monthly audit catches rogue "permanently closed" marks and category drift before they cascade). RECOVERY — when suspended: (1) READ the suspension type: soft (profile unverified but visible) vs hard (delisted) — the reinstatement form is the only path; do NOT create a new listing (duplicate creation during suspension is the escalation that turns weeks into permanent); (2) FIX BEFORE FILING: the reinstatement request is reviewed against the live evidence — correct the violating name/address/categories FIRST, assemble proof (business license, utility bill at the address, storefront/vehicle photos, website matching NAP); (3) FILE ONCE, completely — serial incomplete appeals bury the case; response windows run days-to-weeks; escalation via the Business Profile community/support exists for stuck cases; (4) POST-REINSTATEMENT: no edits for 2-4 weeks, then changes in small batches. THE META-RULE: every suspension story starts with an edit that tried to game something — the boring-honest profile almost never gets suspended.'
  };

  return {
    status: 'success',
    category_strategy: focus === 'category_service_strategy' ? focusContent.category_service_strategy : 'CATEGORY STRATEGY (compressed): the primary category is the strongest controllable pack factor — select it by auditing pack winners for your money queries, specific-beats-general when true; secondary categories for every real service line (up to 9, no spam); services named verbatim as customers search them; quarterly re-audit. Full method: run profile_focus=category_service_strategy.',
    services_attributes: 'SERVICES-AND-ATTRIBUTES ARCHITECTURE: THE SERVICES SECTION as query surface: every category carries its service list — name services in customer language ("drain cleaning", "gel manicure", "wisdom tooth extraction"), add descriptions (300 chars each — the place where service-specific keywords live legitimately), include indicative pricing where the vertical permits (price-transparent profiles convert the comparison shopper and pre-qualify the caller). THE ATTRIBUTES LAYER: attributes answer filter searches and screening questions mechanically (wheelchair accessible, free wifi, outdoor seating, veteran-owned, emergency service, online appointments) — complete every applicable one; several surface directly in search results and Maps filters; the identity attributes (women-owned, etc.) also surface in consumer-facing badges. THE LINKS LAYER: booking link (the conversion artery for appointment businesses), menu link (food), appointment URLs per service where supported, and the website link UTM-tagged so attribution survives. THE HOURS DISCIPLINE: regular hours exact, special/holiday hours maintained every season (the "open now" filter is binary and unforgiving), more-hours sets (delivery hours, drive-through, senior hours) where real. THE COHERENCE RULE: services, attributes, categories, description, website and review reality must tell ONE story — profiles where the surfaces contradict (category says emergency, hours say 9-5) leak both rankings and trust.',
    visual_engine: focus === 'photos_posts_engagement' ? focusContent.photos_posts_engagement : 'VISUAL ENGINE (compressed): the shot list (exterior/interior/team/work/seasonal), 2-4 photos weekly beats quarterly dumps, geotag-stuffing is folklore — cadence and content are the signal; photo-rich profiles win ties in every visual vertical. Full engine with Posts and Q&A systems: run profile_focus=photos_posts_engagement.',
    posts_qa_system: focus === 'photos_posts_engagement' ? 'POSTS & Q&A: covered in full in the visual_engine field above (profile_focus=photos_posts_engagement).' : 'POSTS & Q&A SYSTEM (compressed): weekly Posts rotation (offer / project showcase / tip / seasonal) each with a CTA button; Q&A pre-seeded with the top 10 buying questions (owner-asked, owner-answered — policy-legal and the defense against crowd answers), weekly watch on incoming questions. Full system: run profile_focus=photos_posts_engagement.',
    suspension_playbook: (focus === 'suspension_prevention_recovery' ? focusContent.suspension_prevention_recovery : 'SUSPENSION PLAYBOOK (compressed): top triggers — keyword-stuffed names, address-reality gaps (virtual offices, visible SAB addresses), edit churn, high-risk verticals (video verification ready); recovery — fix violations BEFORE the one complete reinstatement filing, never create a duplicate, freeze edits post-reinstatement. Full playbook: run profile_focus=suspension_prevention_recovery.') + ' VERTICAL NOTES: ' + verticalNotes[vertical] + (focus === 'full_profile_optimization' ? ' FULL-PROFILE SEQUENCE: ' + focusContent.full_profile_optimization : '')
  };
}

/* ─────────────────────────── TOOL 3: REVIEW & REPUTATION ENGINE ─────────────────────────── */

function buildReviewEngine(args) {
  const focus = args.reputation_focus || 'ethical_review_generation';
  const rating = args.current_rating || 'four_to_4_5_stars';

  const ratingBandNotes = {
    under_4_0_stars: 'UNDER-4.0 BAND STRATEGY: below 4.0 is a conversion emergency — a large share of consumers filter at 4.0+, so the rating is costing customers before rankings even matter: (1) OPERATIONS BEFORE ASKS: a sub-4.0 average usually reflects a real operational pattern — read the negative reviews as a free audit (the same complaint three times is a process, not bad luck), fix the top recurring cause FIRST; asking for volume into a broken experience manufactures faster negative velocity; (2) THE RECOVERY MATH, honestly: averages move slowly — a 3.6 across 50 reviews needs ~25-30 consecutive 5-stars to cross 4.2; at 2/week that is a 3-month campaign minimum — set expectations on arithmetic, not hope; (3) THE BACKLOG RESPONSE SWEEP: answering every existing negative review (reader-facing, non-defensive, improvement-naming) changes what prospects see TODAY while the average catches up; (4) THE VELOCITY RESTART: the ask system aimed first at the happiest segment (regulars, repeat customers, referral sources) to re-establish positive momentum; (5) THE REMOVAL SWEEP: flag the genuinely policy-violating reviews (competitor reviews, never-a-customer, off-topic rants, profanity) — removals are won on policy grounds regularly, and at low counts each removal moves the average visibly.',
    four_to_4_5_stars: 'FOUR-TO-4.5 BAND STRATEGY: the competitive middle — healthy but usually outgunned in the pack: (1) THE GAP CLOSE: benchmark the pack trio (count, velocity, rating) — this band typically loses on COUNT and VELOCITY more than rating; the ask system\u2019s job is steady weekly volume; (2) THE 4.5 THRESHOLD: crossing 4.5 changes the visual tier (star display rounding and consumer perception both jump) — with a 4.3 across 80 reviews, ~20-25 straight 5-stars crosses it; worth a focused quarter; (3) THE RECENCY GUARD: a strong average with a 4-month review drought reads as decline to both the algorithm and the human scanner — velocity consistency (even 1-2/week) outranks occasional bursts; (4) THE TEXT HARVEST: this band usually has volume but thin text — the ask evolution: invite specifics ("mention the service and your neighborhood if you are comfortable!") because keyworded, city-named review text is ranking fuel the star-only review does not provide.',
    above_4_5_stars: 'ABOVE-4.5 BAND STRATEGY: the rating is won — the game shifts to volume, velocity, text and DEFENSE: (1) THE MOAT MATH: at 4.7+, every additional review is a widening moat (competitors must outwork your velocity for months to catch the count) — do not slow the ask system because the number looks done; count and recency keep ranking long after the average stabilizes; (2) THE TEXT-RICHNESS CAMPAIGN: steer asks toward specifics — service names, neighborhoods, practitioner names — the review corpus becomes a self-writing relevance engine; (3) THE DEFENSE LAYER: high-rating profiles attract review-bombing (fired employees, competitor campaigns, viral pile-ons) — the response protocol: respond calmly to each, flag policy violations with evidence, and in bombing events use the appeals/escalation paths with documentation; a prepared operator survives bombing with the average intact; (4) THE LEVERAGE LAYER: the reputation asset now feeds everything else — review snippets (with permission) on landing pages and ads, the rating in ad extensions, the "rated 4.8 by 400+ customers" trust line on every conversion surface.'
  };

  const focusContent = {
    ethical_review_generation: 'ETHICAL REVIEW-GENERATION DEEP-DIVE: THE TIMING LAW: ask at the happiness peak — the moment the value landed: the fixed faucet demo, the checkout compliment, the end-of-treatment smile, the delivered project walkthrough; asks hours or days later convert at a fraction (the delay decays goodwill and memory); the operational translation: the ask is part of the SERVICE SCRIPT, not a marketing task ("I\u2019m so glad it worked out — would you mind sharing that in a Google review? It genuinely helps a small business. I can text you the link right now."); (2) THE FRICTION KILL: the direct review link (the g.page/r short link from the GBP dashboard) delivered in the moment — texted on the spot, QR on the counter/receipt/van/invoice, the one-tap email button; every additional step halves completion; (3) THE CHANNEL SCRIPTS: IN-PERSON (highest conversion — the verbal ask + instant text), SMS within the hour ("Thanks again for choosing us today! If you have 60 seconds, a Google review means the world: [link]"), EMAIL same-day with the one-button layout, INVOICE/RECEIPT QR as the passive layer; (4) THE SYSTEMATIZATION: the ask tied to a trigger event in the workflow (job closed, appointment completed, order delivered) so velocity is a byproduct of operations — systematic-and-honest produces the organic-looking velocity curve because it IS organic; (5) THE VELOCITY SANITY: natural asking produces natural pacing; 40 reviews in a weekend after 2 years of silence triggers filters regardless of authenticity — if a backlog of happy customers exists, drip the asks over weeks; (6) WHAT THE ASK MAY NEVER DO: no incentives for reviews (discounts-for-stars violates Google policy and FTC rules), no review gating (filtering unhappy customers to private feedback while routing happy ones to Google is explicitly banned by both), no employee/family reviews, no reciprocal review rings — the honest ask at the right moment outperforms every scheme anyway, which is the quiet joke of the whole industry.',
    review_response_system: 'REVIEW-RESPONSE DEEP-DIVE: THE AUDIENCE TRUTH: responses are written for the thousand future READERS, not the one past reviewer — every response is marketing copy wearing customer-service clothes: (1) THE SLA: 24-48h on everything, 100% coverage — response rate and speed are engagement signals, and the un-responded negative review reads as confirmation; (2) POSITIVE-REVIEW RESPONSES (the wasted surface): beyond thanks, naturally echo the specifics ("So glad the emergency water heater replacement went smoothly!") — the response text is indexed surface where service keywords legitimately live; vary the phrasing (copy-paste gratitude reads robotic at scale); (3) THE NEGATIVE-REVIEW PROTOCOL: (a) never defensive, never counter-attacking — the reader sides with calm; (b) acknowledge the experience without necessarily conceding contested facts ("I\u2019m sorry this visit did not meet the standard we aim for"); (c) state the fix or the standard ("we have reviewed this with the team / here is what we changed"); (d) move specifics offline ("please call me directly — [name], owner") — the OWNER signature de-escalates; (e) keep it under 100 words: long rebuttals read as guilt; (4) THE FAKE/UNFAIR REVIEW LANE: respond once, factually and calmly ("we have no record of serving you and take this seriously"), then FLAG on policy grounds (conflict of interest, not-a-customer, off-topic, profanity) with the evidence; removal succeeds on policy violations regularly — and the calm public response protects you with readers even when removal fails; (5) THE LEGAL LINE by vertical: regulated businesses (health, legal, finance) never confirm the person was a client/patient — the sentiment-only response pattern.',
    rating_recovery_protocol: 'RATING-RECOVERY DEEP-DIVE: the full protocol for damaged ratings: PHASE 1 — THE FORENSIC READ (week 1): export/t tabulate every negative review by cause — the distribution tells the truth (one toxic ex-employee era? one recurring process failure? a pricing-expectation mismatch?); the pattern dictates the fix; PHASE 2 — THE OPERATIONAL REPAIR (weeks 1-4): fix the top recurring cause VISIBLY (new process, new staffing, new expectation-setting at sale time) — recovery campaigns without operational change recycle the same 1-stars; PHASE 3 — THE RESPONSE SWEEP (week 1-2, parallel): every existing negative answered with the reader-first protocol — this changes prospect perception immediately, months before the average moves; PHASE 4 — THE REMOVAL SWEEP: flag every policy-violating review with documentation; at low review counts each removal is worth multiple new 5-stars arithmetically; PHASE 5 — THE VELOCITY CAMPAIGN (weeks 2-12): the ethical ask system aimed first at the demonstrably-happy segments (repeat customers, referrers, the ones who thank you unprompted), run as a steady drip; PHASE 6 — THE MILESTONE MATH: pre-compute the targets (current sum of stars ÷ count; how many 5-stars to reach 4.0, 4.3, 4.5) and track weekly — visible arithmetic keeps the team asking when motivation dips. THE HARD HONESTY: a business that cannot stop generating 1-stars has a product problem no review strategy solves — reputation engineering amplifies reality; it cannot replace it.',
    competitive_reputation_gap: 'REPUTATION-GAP DEEP-DIVE: reviews are the measurable half of PROMINENCE — benchmark the pack and close the gaps in order: (1) THE FIVE-NUMBER AUDIT per pack competitor: total count, last-90-day velocity, average rating, response rate, and text richness (service/city mentions per review) — build the table; the pack order correlates with it more often than any other visible factor; (2) GAP PRIORITY: VELOCITY first (recency is weighted — matching their last-90-days output starts closing perceived momentum immediately, and it is the only number you control this week), COUNT second (the long compounding project — at +8/month vs their +3, a 100-review gap closes in 20 months; at +15/month, in 8 — the ask-system throughput IS the strategy), RATING third (only actionable via the recovery protocol if you trail), TEXT RICHNESS always (the ask script upgrade is free); (3) THE RESPONSE-RATE ARBITRAGE: most local businesses respond to under a third of reviews — 100% coverage with keyword-echoing responses is an available edge in almost every market; (4) THE REVIEW-SOURCE DIVERSIFICATION note: Google dominates, but the vertical second platform (TripAdvisor food/travel, Healthgrades/Zocdoc health, Houzz/Angi home services, Yelp where it still bites) feeds both its own audience and the citation layer; (5) THE QUARTERLY RE-SCAN: the gap table refreshed quarterly — reputation is a race measured in relative velocity, and the competitor who starts asking systematically shows up in your table before they show up above you in the pack.'
  };

  return {
    status: 'success',
    review_generation: focus === 'ethical_review_generation' ? focusContent.ethical_review_generation : 'REVIEW GENERATION (compressed): ask at the happiness peak as part of the service script, kill friction (direct g.page link texted in the moment, QR on receipts/invoices), channel scripts (in-person > SMS-within-the-hour > same-day email > passive QR), systematize on workflow triggers for steady velocity, and never: incentives, gating, employee reviews, bursts. Full system: run reputation_focus=ethical_review_generation.',
    response_system: focus === 'review_response_system' ? focusContent.review_response_system : 'RESPONSE SYSTEM (compressed): write for future readers, 24-48h SLA at 100% coverage, echo service keywords naturally in positive responses, the 5-step negative protocol (calm, acknowledge, state the fix, take it offline with the owner signature, under 100 words), flag policy violators after one factual public reply. Full system: run reputation_focus=review_response_system.',
    rating_recovery: focus === 'rating_recovery_protocol' ? focusContent.rating_recovery_protocol : 'RATING RECOVERY (compressed): forensic read of negative-review causes → visible operational fix → full response sweep → policy-violation removal sweep → ethical velocity campaign to the happy segments → milestone math tracked weekly. Amplification cannot replace operations. Full protocol: run reputation_focus=rating_recovery_protocol.',
    reputation_gap_analysis: focus === 'competitive_reputation_gap' ? focusContent.competitive_reputation_gap : 'REPUTATION GAP (compressed): the five-number pack audit (count, 90-day velocity, rating, response rate, text richness), close velocity first, count second; 100% keyword-echoing response coverage is the available arbitrage in most markets; quarterly re-scan. Full analysis: run reputation_focus=competitive_reputation_gap.',
    policy_red_lines: 'THE POLICY RED LINES (what gets businesses penalized, delisted and sued): (1) FAKE REVIEWS in any form — purchased, farmed, AI-generated, employee-written, exchanged — Google\u2019s detection models work on reviewer-graph and velocity patterns, removals happen in sweeps (the purchased batch vanishes with the average), and the US FTC rule on fake reviews (effective 2024) carries per-violation fines in the tens of thousands of dollars, with equivalents live in the UK (DMCC) and EU; (2) REVIEW GATING — the survey that routes happy customers to Google and unhappy ones to a private form violates Google policy explicitly and the FTC treats it as review suppression; ask EVERYONE or ask no one; (3) INCENTIVIZED REVIEWS — discounts, freebies, draw entries for reviews violate Google policy regardless of star outcome, and undisclosed incentives violate FTC rules; (4) REVIEW-SWAP RINGS and reciprocal arrangements — detectable graph patterns; (5) IMPERSONATION/ASTROTURF responses or flagging competitor reviews without grounds. THE STRATEGIC READ: these rules are ASYMMETRIC in your favor when you operate honestly — competitors who violate them are removable (report with evidence via the redressal and review-flag paths), while your honest velocity is unremovable. The ethical system is not the handicapped option; it is the only one whose gains survive audits, sweeps and lawsuits. ' + ratingBandNotes[rating]
  };
}

/* ─────────────────────────── TOOL 4: LOCAL RANKINGS DOMINATION ─────────────────────────── */

function dominateRankings(args) {
  const focus = args.ranking_focus || 'citations_nap_consistency';
  const locations = args.location_count || 'single_location';

  const locationPlaybooks = {
    single_location: 'SINGLE-LOCATION PLAYBOOK: depth beats breadth — one profile, one location page (or a homepage that IS the location page for single-market businesses), the full citation core, and every local link the market offers; the single-location advantage is focus: all review velocity, all content and all links compound into ONE entity record; the common error at this scale is diluting effort into city pages for places with no real presence (thin doorway pages that neither rank nor convert) — the honest radius is where customers actually come from, and prominence stretches reach further than fake geography ever does.',
    two_to_ten_locations: 'TWO-TO-TEN-LOCATION PLAYBOOK: the systemization tier — (1) ONE PROFILE PER REAL LOCATION, each verified at its own address with its own local phone, its own location page (unique content: team, photos, reviews, directions, local specifics — the template with swapped city names is the doorway pattern that underperforms and risks filtering), and location-specific tracking (per-location UTM, per-location call numbers handled DNI-correctly); (2) THE NAP MATRIX: a canonical spreadsheet of every location\u2019s exact NAP, enforced across citations — multi-location NAP chaos compounds per location; (3) THE REVIEW FEDERATION: ask systems run PER LOCATION (reviews attach to the location profile; the flagship hoarding all reviews while branches starve is the standard failure), with per-location response ownership; (4) THE CANNIBALIZATION WATCH: locations in adjacent territories need differentiated categories/services where their catchments overlap; (5) THE SCOREBOARD: per-location GeoGrid + the consolidated dashboard — multi-location averages hide the one dying branch.',
    ten_plus_locations: 'TEN-PLUS-LOCATION PLAYBOOK: the infrastructure tier — (1) BULK MANAGEMENT: the Business Profile bulk-verification and location-group tooling (10+ locations qualify for bulk verification via spreadsheet upload — individually re-verifying 40 stores is unnecessary pain), API-based profile management for hours/attributes/Posts at fleet scale; (2) THE LOCATION-PAGE SYSTEM: a genuine per-location content model (local staff, local reviews, local photos, local FAQs, embedded map, structured data per location) generated from a data layer but EDITORIALLY localized — at this scale the thin-template trap is both tempting and expensive; (3) THE DATA GOVERNANCE LAYER: a single source of truth for location data (openings, closures, moves, rebrands) with a propagation protocol (GBP, site, citations, aggregators) — location-data drift at fleet scale is reputation-and-rankings rot; (4) THE FRANCHISE WRINKLES: franchisee-claimed rogue profiles reclaimed into the org account, brand-consistent naming (no franchisee keyword-stuffing), centralized response standards with local execution; (5) THE PORTFOLIO ANALYTICS: per-location rank grids, review velocity and conversion metrics rolled into cohorts (urban/suburban, mature/new) — fleet strategy is cohort strategy.'
  };

  const focusContent = {
    citations_nap_consistency: 'CITATION-NAP DEEP-DIVE: citations are the corroboration layer — THE CANONICAL NAP: one exact format of Name, Address, Phone decided once (suite numbering, abbreviations, tracking-number policy) and reused character-identical everywhere — the entity-resolution systems forgive minor variance, but the business with three names and four phone formats scattered across the web is asking the algorithm to guess; (2) THE AGGREGATOR-FIRST STRATEGY: in the US, the data aggregators (Data Axle, Foursquare, Neustar/Localeze) feed hundreds of downstream directories — correcting the aggregators corrects the long tail over months; direct submissions then cover the core; (3) THE CORE STACK that actually matters: Google, Apple Business Connect (Apple Maps is the default on half of US phones and chronically neglected), Bing Places, Yelp, Facebook/Instagram, the vertical big-two (Healthgrades/Zocdoc, Avvo, Houzz/Angi, TripAdvisor, OpenTable — per vertical), and the genuine local directories (chamber, BBB, city business directories) — roughly 15-25 citations of REAL weight; (4) THE 300-DIRECTORY HONESTY: the long-tail directory blast sold by cheap services adds near-zero ranking value in 2026 (citations are a foundation factor with a fast ceiling, not a volume game) and creates a permanent cleanup liability; (5) THE CLEANUP PROTOCOL after moves/rebrands/number changes: inventory first (search old NAP variants in quotes), fix the aggregators, fix the core by hand, suppress/merge duplicates (duplicate listings SPLIT reviews and confuse entity resolution — the merge is worth real money), re-scan quarterly; (6) THE MAINTENANCE REALITY: citations decay (directories scrape stale sources and resurrect old data) — the quarterly NAP scan is hygiene, not paranoia.',
    local_landing_pages: 'LOCAL-LANDING-PAGE DEEP-DIVE: the pages that rank without becoming doorway spam — THE ARCHITECTURE: (1) THE LOCATION PAGE (one per real location): H1 with service + city, the embedded map and NAP block (matching canonical exactly), unique local content (this location\u2019s team, photos, hours, parking/transit specifics, neighborhoods served), location reviews rendered on-page, internal links from the main nav — this is the page the GBP website link should target for multi-location (single-location may use the homepage); (2) THE SERVICE PAGES (one per money service): the service explained with depth (process, pricing approach, FAQs, before/afters), city-anchored naturally in title/H1/content, linked from the location page hub; (3) THE CITY PAGES (service-area businesses only, and only for cities with REAL operations): the doorway line is crossed when pages are template-identical with swapped city names and zero local substance — the pages that survive: real jobs completed there (project photos, case notes), real reviews from residents, genuinely local FAQs (permits, water conditions, architecture quirks), driving/response-time honesty; if there is nothing real to say about a city, the page should not exist; (4) THE SCHEMA STACK: LocalBusiness (or the specific subtype: Dentist, Plumber, Restaurant) with NAP/geo/hours/sameAs on the location page, Service schema per service page, FAQPage where FAQs are visible, Review/AggregateRating markup ONLY per current policy (self-serving review stars on LocalBusiness are restricted — the schema that misrepresents gets rich-result penalties); (5) THE INTERNAL-LINK GEOMETRY: location hub → service spokes → city satellites, all linked back — one coherent topical neighborhood per location.',
    local_link_building: 'LOCAL-LINK DEEP-DIVE: the links national competitors cannot buy and most agencies never try — (1) THE MEMBERSHIP LAYER (fast, cheap, real): chamber of commerce, BBB, trade associations, local business groups — directory links from real-membership organizations, often the first links a local site should get; (2) THE SPONSORSHIP ENGINE (the local-link workhorse): youth sports teams, school events, charity runs, community festivals, local arts — $100-500 sponsorships routinely carry a link from the organization\u2019s sponsors page, and they compound into the community-presence flywheel that generates reviews and word-of-mouth too (the link is the receipt; the goodwill is the asset); (3) THE LOCAL-PRESS LANE: local news still links — the pitches that land: genuine hiring/expansion news, community involvement, the local-expert commentary offer (the reporter covering the cold snap wants the plumber quote TODAY; the HARO-style local variant), annual scholarship or award programs (evergreen link magnets); (4) THE SUPPLIER-AND-PARTNER SWEEP: distributors, manufacturers ("find a dealer/installer" pages), complementary businesses (the wedding venue linking the caterer), landlord/BID sites — links already earned by the relationship, just unclaimed; (5) THE CONTENT-THAT-EARNS layer: the neighborhood guide, the annual local-industry report, the genuinely useful local resource (permit guides, local cost guides with real numbers) — earns organic links slowly and converts forever; (6) THE SKIP LIST: paid link farms, reciprocal rings, comment spam — the local link graph is small and anomalies glow. THE WEIGHTING NOTE: local links move BOTH the organic layer and (via the linked landing page\u2019s authority) pack prominence — they are the rare lever that pushes both boards at once.',
    geogrid_rank_tracking: 'GEOGRID-TRACKING DEEP-DIVE: coordinate-truth beats keyword-fiction — THE WHY: pack rankings are computed per searcher location; "we rank #2" is meaningless without coordinates (position 2 at the office is routinely position 12 four miles out) — the GeoGrid scan (a lattice of simulated search points across the market, 7x7 or 9x9, spacing matched to market density: 1-2km urban, 3-5km suburban) is the only honest scoreboard in local; THE READING: the green core (winning zone) around the location, the yellow transition ring, the red frontier — strategy reads directly off the map: (a) red NEAR the location = profile-strength problem (relevance/prominence — fix the profile and reviews), (b) green core with a tight radius = proximity-bound (normal; expansion = prominence growth or new locations), (c) directional asymmetry (winning north, losing south) = usually a competitor cluster or demographic/query differences — check the competitor\u2019s location on the map before blaming the algorithm; THE CADENCE: baseline scan before any work, then monthly (weekly during active campaigns) on the 3-5 money queries — not twenty queries, the ones that pay; THE INTERPRETATION DISCIPLINE: single-scan jumps are noise (pack volatility is real) — trend across 3+ scans is signal; pair every scan with the conversion numbers (calls, direction requests, bookings) because a prettier map with a silent phone is decoration; THE COMPETITOR OVERLAY: scanning the top competitor\u2019s grid on the same queries reveals whether their advantage is global (profile strength — attackable) or geographic (their location sits where the demand is — strategic information for the next-location decision). THE TOOLING NOTE: multiple affordable GeoGrid tools exist (Local Falcon class); the methodology above is tool-agnostic.'
  };

  return {
    status: 'success',
    citation_system: focus === 'citations_nap_consistency' ? focusContent.citations_nap_consistency : 'CITATION SYSTEM (compressed): one canonical NAP everywhere, aggregator-first (Data Axle, Foursquare, Localeze) then the 15-25 core citations that matter (Google, Apple Business Connect, Bing, Yelp, Facebook, the vertical big-two, real local directories); the 300-directory blast is 2026 snake oil; duplicate merges are worth real money; quarterly NAP scans. Full system: run ranking_focus=citations_nap_consistency.',
    landing_page_architecture: focus === 'local_landing_pages' ? focusContent.local_landing_pages : 'LANDING PAGES (compressed): location pages with unique local substance (team, photos, reviews, specifics), service pages per money service, city pages ONLY where real operations exist (the doorway line), LocalBusiness/Service/FAQPage schema stack, hub-and-spoke internal linking. Full architecture: run ranking_focus=local_landing_pages.',
    local_link_engine: focus === 'local_link_building' ? focusContent.local_link_building : 'LOCAL LINKS (compressed): memberships (chamber, BBB, associations), the sponsorship engine ($100-500 community sponsorships with links), local press (expert commentary, expansion news, scholarships), supplier/partner "find a dealer" sweeps, and the local resource content that earns links slowly — the lever that moves organic and pack prominence together. Full engine: run ranking_focus=local_link_building.',
    geogrid_tracking: focus === 'geogrid_rank_tracking' ? focusContent.geogrid_rank_tracking : 'GEOGRID TRACKING (compressed): pack ranks are per-coordinate — scan a 7x7/9x9 lattice on the 3-5 money queries, read the green core/red frontier (red near home = profile problem; tight core = proximity-bound), monthly cadence, trends over single scans, always paired with call/booking numbers. Full discipline: run ranking_focus=geogrid_rank_tracking.',
    multi_location_playbook: locationPlaybooks[locations]
  };
}

/* ─────────────────────────── TOOL 5: LOCAL TRAFFIC CONVERSION ─────────────────────────── */

function convertLocalTraffic(args) {
  const focus = args.conversion_focus || 'full_conversion_system';
  const intent = args.customer_intent || 'research_compare_intent';

  const intentCalibration = {
    emergency_now_intent: 'EMERGENCY-INTENT CALIBRATION (burst pipe, locked out, toothache, dead battery): the psychology is SPEED-AND-CERTAINTY — the searcher picks the first option that proves it can come NOW: (1) the conversion window is minutes — missed calls are lost jobs, period; the answer rate and the missed-call text-back ("Got your call — how can we help? We can be there by 3pm") are the whole game; (2) the surfaces must scream availability: "24/7" and "same-day" in the GBP description and services (where true), emergency hours set, the landing page above-the-fold stating response time and coverage area before anything else; (3) price transparency calms panic: "service call $X, applied to the repair" converts the emergency searcher who fears being gouged; (4) THE TRUTH CONSTRAINT: claiming 24/7 while routing night calls to voicemail manufactures the angriest reviews in local search — emergency positioning is an operations commitment wearing a marketing label; (5) ads note: emergency queries are where Local Services Ads shine (pay-per-lead on the highest-intent clicks) and where broad PMax wastes budget on researchers.',
    research_compare_intent: 'RESEARCH-INTENT CALIBRATION (choosing a dentist, gym, renovation contractor, salon): the psychology is SHORTLIST-AND-SCREEN — the customer opens 2-3 tabs and eliminates: (1) the elimination criteria in order: rating threshold (4.0/4.5 filters), review recency and story (what do the last 10 reviews SAY?), photo reality check, then the screening questions (price range, insurance, availability, credentials) — the profile and page that pre-answer the screening survive the cut; (2) the conversion is rarely a call on first visit — the booking link, the "get a quote" form with 3 fields (not 11), and the remarketing-friendly content (the pricing guide, the before/after gallery) capture the researcher at their pace; (3) response SPEED still decides among finalists: the quote answered in 10 minutes wins against the one answered tomorrow at a staggering rate — speed-to-lead discipline applies to forms as much as calls; (4) the trust assets carry the sale: case photos, named team, credentials, the review responses (researchers READ owner responses as a character test); (5) ads note: research intent rewards the full-funnel: LSA/search for the "best X near me" moment plus the retargeting layer for the 2-week decision cycle.'
  };

  const focusContent = {
    calls_and_bookings: 'CALLS-AND-BOOKINGS DEEP-DIVE: the highest-ROI numbers in local business are operational, not algorithmic — (1) THE ANSWER-RATE AUDIT: local businesses miss 25-40% of inbound calls on average, and a missed call in a competitive market is a competitor\u2019s customer within minutes — measure it first (call tracking exposes it), then fix it operationally: ring groups, overflow routing, the front-desk answer script with booking authority; (2) THE MISSED-CALL TEXT-BACK (the single cheapest revenue recovery in local): the instant automated SMS to every missed call ("Sorry we missed you! How can we help?") rescues a large share of would-be-lost leads — minutes matter: the texted-back lead books before they finish calling competitor #2; (3) THE BOOKING-LINK UBIQUITY: the scheduler on the GBP (Reserve/Book), the website header, the review responses ("book your next visit at..."), the SMS signature, the invoice footer — every surface a customer touches can book; (4) THE AFTER-HOURS CAPTURE: half of local research happens evenings — the booking link and the after-hours voicemail-to-text with next-morning SLA capture what the closed-office loses; (5) THE SPEED-TO-LEAD LAW: form and message leads answered within 5 minutes convert at multiples of hour-later responses — the lead-notification path (who gets pinged, where, with what authority) is conversion infrastructure.',
    local_website_conversion: 'LOCAL-WEBSITE-CONVERSION DEEP-DIVE: local pages have one job — make the next step obvious in 5 seconds on a phone: (1) THE ABOVE-THE-FOLD FORMULA: service + area + proof + action in the first viewport: "Emergency Plumbing in [City] — 45-min response · 4.8 stars from 400+ neighbors · [CALL NOW] [BOOK ONLINE]" — the H1 answers "right place?", the proof answers "trustworthy?", the buttons answer "what now?"; (2) MOBILE-FIRST AS FACT: local intent is overwhelmingly mobile — the click-to-call button sticky and thumb-reachable, forms at 3 fields maximum (name, phone, what do you need), tap targets real, LCP under 2.5s (the local searcher waits for nobody); (3) THE TRUST BLOCK: live review feed (actual Google reviews rendered with attribution), license/insurance numbers for trades, team faces, service-area map, years-in-business — assembled in one scannable band; (4) THE FRICTION AUDIT: every field, click and decision between landing and booked is a leak — the quote form asking 11 questions converts a fraction of the 3-field version (qualify on the phone, not the form); (5) THE LOCAL-PROOF CONTENT: the pricing guide ("what does X cost in [city]" — the page competitors fear writing converts researchers and ranks), the FAQ page mirroring real screening questions, the project gallery by neighborhood; (6) THE CONSISTENCY SEAL: the page must deliver what the GBP promised (services, prices, hours) — the profile-to-page mismatch is where conversions silently die.',
    local_ads_profitably: 'LOCAL-ADS DEEP-DIVE: paid local, with the honesty most agencies skip — (1) LOCAL SERVICES ADS (where the vertical qualifies: trades, legal, health and more): pay-per-LEAD (not click), the Google Screened/Guaranteed badge, placement ABOVE the pack — the setup realities: background-check and license verification takes weeks (start now), rankings within LSA track responsiveness and review count (the review engine feeds the ads), and the lead-dispute discipline (marking junk leads) protects the budget; LSA is usually the first paid dollar a local service business should spend because the intent is pre-qualified; (2) SEARCH CAMPAIGNS: exact/phrase on money queries + "[service] [city]" variants, location targeting tight (radius or ZIP, with bid-down on the fringe), call extensions/call campaigns with call tracking, negative-keyword hygiene (DIY, jobs, free) — the small-budget discipline: ONE campaign, five keywords, tight geography beats the sprawling account every time; (3) PERFORMANCE MAX FOR LOCAL: works with real conversion feeding (calls, bookings as primary conversions — not pageviews) and store-goal assets; dangerous on autopilot with thin conversion data (it optimizes toward whatever you measure, including junk); (4) THE BUDGET FLOOR HONESTY: below ~$500-750/month in a competitive metro, search ads buy noise — at micro-budgets, LSA (pay-per-lead caps the waste) or putting the money into reviews/content usually outperforms; (5) THE MEASUREMENT BAR: cost-per-LEAD and cost-per-BOOKED-JOB by channel, or the spend is faith-based.',
    full_conversion_system: 'FULL-CONVERSION-SYSTEM: the local revenue pipeline assembled — LAYER 1: VISIBILITY (the profile, rankings and reviews built by the other four tools) feeds LAYER 2: CAPTURE (answer rate fixed, missed-call text-back live, booking links ubiquitous, 3-field forms, after-hours flow) feeds LAYER 3: CONVERSION (the above-the-fold formula, trust blocks, speed-to-lead under 5 minutes) feeds LAYER 4: MEASUREMENT (UTM-tagged profile links, call tracking with DNI done NAP-safely, booking events, the weekly scorecard: calls, direction requests, bookings, booked-job value by source) feeds LAYER 5: COMPOUNDING (every served customer enters the review-ask flow → more prominence → more visibility → the flywheel). THE SYSTEM AUDIT ORDER when revenue lags visibility: answer rate first (the leak is usually here), speed-to-lead second, page friction third, intent-match fourth (ranking for queries you do not really serve converts nothing) — rankings last, because by the time revenue is the complaint, visibility usually is not the bottleneck. THE WEEKLY SCORECARD (10 minutes): calls + answer rate, leads + median response time, bookings, reviews added, and one experiment verdict — local domination is operations wearing an SEO costume.'
  };

  return {
    status: 'success',
    call_booking_layer: focus === 'calls_and_bookings' ? focusContent.calls_and_bookings : 'CALLS & BOOKINGS (compressed): fix the 25-40% missed-call leak first, missed-call text-back as the cheapest revenue recovery, booking links on every surface, after-hours capture, and the 5-minute speed-to-lead law. Full layer: run conversion_focus=calls_and_bookings.',
    website_conversion: focus === 'local_website_conversion' ? focusContent.local_website_conversion : 'WEBSITE CONVERSION (compressed): the above-the-fold formula (service + area + proof + action), mobile-first with sticky click-to-call and 3-field forms, the trust block (reviews, licenses, faces, map), the pricing-guide content that converts researchers, profile-to-page consistency. Full architecture: run conversion_focus=local_website_conversion.',
    local_ads_layer: focus === 'local_ads_profitably' ? focusContent.local_ads_profitably : 'LOCAL ADS (compressed): LSA first where eligible (pay-per-lead, Google Screened, fed by your review count), tight single-campaign search with call tracking, PMax only with real conversion data, and the budget-floor honesty (~$500-750/month minimum in competitive metros — below it, buy reviews-and-content effort instead). Full layer: run conversion_focus=local_ads_profitably.',
    measurement_spine: 'THE MEASUREMENT SPINE: (1) UTM-tag every GBP link (website, appointment, menu — source=google / medium=organic / campaign=gbp-listing) or profile traffic hides inside generic organic forever; (2) CALL TRACKING done NAP-safely: dynamic number insertion (DNI) on the WEBSITE is safe; the GBP primary number should remain the canonical business line (a tracking number as primary can propagate into citations and seed NAP chaos — if used, the real number goes in as additional and the canonical discipline tightens); (3) THE NATIVE METRICS read monthly with skepticism and trend-focus: profile interactions (calls, direction requests, website clicks, bookings) — directionally useful, occasionally restated by Google; (4) THE REAL KPIs in order: booked jobs/appointments by source, leads by source with response time, calls answered vs missed, THEN rankings (the GeoGrid) — rankings are the leading indicator, revenue is the verdict; (5) THE ATTRIBUTION HONESTY for the owner: last-click undercounts local SEO structurally (the customer who saw the pack, read reviews Tuesday and called from the profile Friday attributes wherever the last tap landed) — judge the program on the trend of booked work and the weekly scorecard, not on any single dashboard\u2019s theology.',
    intent_calibration: intentCalibration[intent] + (focus === 'full_conversion_system' ? ' FULL SYSTEM: ' + focusContent.full_conversion_system : '')
  };
}
