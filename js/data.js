/* ═══════════════════════════════════════════
   SEED DATA — Categories & Contract Templates
   Generated from seed_data/*.json
   ═══════════════════════════════════════════ */

const DEFAULT_CATEGORIES = [
  {
    "id": 1,
    "name_de": "Kaufvertrag",
    "name_en": "Purchase Agreement",
    "slug": "kaufvertrag"
  },
  {
    "id": 2,
    "name_de": "Mietvertrag",
    "name_en": "Lease/Rental Agreement",
    "slug": "mietvertrag"
  },
  {
    "id": 3,
    "name_de": "Dienstvertrag",
    "name_en": "Service Contract",
    "slug": "dienstvertrag"
  },
  {
    "id": 4,
    "name_de": "Darlehensvertrag",
    "name_en": "Loan Agreement",
    "slug": "darlehensvertrag"
  },
  {
    "id": 5,
    "name_de": "Vertraulichkeitsvereinbarung (NDA)",
    "name_en": "Non-Disclosure Agreement",
    "slug": "nda"
  },
  {
    "id": 6,
    "name_de": "Arbeitsvertrag",
    "name_en": "Employment Contract",
    "slug": "arbeitsvertrag"
  },
  {
    "id": 7,
    "name_de": "Auftrag/Geschäftsbesorgung",
    "name_en": "Agency/Mandate Agreement",
    "slug": "auftrag"
  }
];

const SEED_TEMPLATES = [
  {
  "id": 1,
  "category_id": 1,
  "title_de": "Standard-Kaufvertrag",
  "title_en": "Standard Purchase Agreement",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{seller_name}}, {{seller_address}} (im Folgenden \"Verkäufer\") und {{buyer_name}}, {{buyer_address}} (im Folgenden \"Käufer\") wird folgender Kaufvertrag gemäß §§ 433 ff. BGB geschlossen:",
      "content_en": "Between {{seller_name}}, {{seller_address}} (hereinafter \"Seller\") and {{buyer_name}}, {{buyer_address}} (hereinafter \"Buyer\") the following purchase agreement is concluded pursuant to §§ 433 ff. BGB:",
      "fields": [
        {
          "key": "seller_name",
          "label_de": "Name des Verkäufers",
          "label_en": "Seller Name",
          "type": "text",
          "required": false
        },
        {
          "key": "seller_address",
          "label_de": "Adresse des Verkäufers",
          "label_en": "Seller Address",
          "type": "text",
          "required": false
        },
        {
          "key": "seller_legal_rep",
          "label_de": "Gesetzlicher Vertreter des Verkäufers",
          "label_en": "Seller Legal Representative",
          "type": "text",
          "required": false
        },
        {
          "key": "buyer_name",
          "label_de": "Name des Käufers",
          "label_en": "Buyer Name",
          "type": "text",
          "required": false
        },
        {
          "key": "buyer_address",
          "label_de": "Adresse des Käufers",
          "label_en": "Buyer Address",
          "type": "text",
          "required": false
        },
        {
          "key": "buyer_legal_rep",
          "label_de": "Gesetzlicher Vertreter des Käufers",
          "label_en": "Buyer Legal Representative",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Kaufgegenstand",
      "title_en": "Subject Matter",
      "content_de": "Der Verkäufer verkauft und der Käufer kauft die nachstehend bezeichnete Ware: {{goods_description}}. Die Ware wird in folgender Qualität und Beschaffenheit geliefert: {{quality_specs}}. Die vereinbarte Menge beträgt {{quantity}} Stück/ Einheiten gemäß {{quantity_unit}}. Die Bestellung erfolgt auf Basis der Artikelnummer(n) {{article_numbers}}. Sollte der Verkäufer die Ware nicht selbst herstellen, bleibt ein Selbstbelieferungsvorbehalt vorbehalten.",
      "content_en": "The Seller sells and the Buyer purchases the goods described below: {{goods_description}}. The goods shall be supplied in the following quality and condition: {{quality_specs}}. The agreed quantity is {{quantity}} units. The order is based on the item number(s) {{article_numbers}}. Should the Seller not manufacture the goods themselves, a self-supply reservation remains reserved.",
      "fields": [
        {
          "key": "goods_description",
          "label_de": "Beschreibung der Kaufsache",
          "label_en": "Description of Goods",
          "type": "textarea",
          "required": false
        },
        {
          "key": "quality_specs",
          "label_de": "Qualitäts- und Beschaffenheitsmerkmale",
          "label_en": "Quality and Condition Specifications",
          "type": "textarea",
          "required": false
        },
        {
          "key": "quantity",
          "label_de": "Menge",
          "label_en": "Quantity",
          "type": "text",
          "required": false
        },
        {
          "key": "quantity_unit",
          "label_de": "Mengeneinheit",
          "label_en": "Unit of Quantity",
          "type": "select",
          "required": false,
          "options": [
            "Stück",
            "kg",
            "Liter",
            "Meter",
            "Palette",
            "Set"
          ]
        },
        {
          "key": "article_numbers",
          "label_de": "Artikelnummer(n)",
          "label_en": "Item Number(s)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Kaufpreis und Zahlungsbedingungen",
      "title_en": "Price and Payment Terms",
      "content_de": "Der Kaufpreis beträgt {{price}} EUR (netto). Hinzu kommt die gesetzliche Umsatzsteuer in Höhe des jeweils gültigen Steuersatzes ({{vat_rate}}%). Zahlungsmethode: {{payment_method}}. Die Zahlung erfolgt innerhalb von {{payment_days}} Tagen nach Rechnungsstellung und Lieferung. Bei Zahlung innerhalb von {{discount_days}} Tagen gewährt der Verkäufer einen Skontoabzug in Höhe von {{discount_percent}}%. Bei Zahlungsverzug schuldet der Käufer Verzugszinsen in Höhe von {{late_interest}} Prozentpunkten über dem jeweiligen Basiszinssatz gemäß § 288 BGB. Die Geltendmachung eines weiteren Verzugsschadens bleibt vorbehalten.",
      "content_en": "The purchase price amounts to {{price}} EUR (net). Statutory value-added tax at the applicable rate ({{vat_rate}}%) shall be added. Payment method: {{payment_method}}. Payment shall be made within {{payment_days}} days of invoicing and delivery. If payment is made within {{discount_days}} days, the Seller grants a discount of {{discount_percent}}%. In case of late payment, the Buyer owes default interest at {{late_interest}} percentage points above the respective base rate pursuant to § 288 BGB. The assertion of further default damages remains reserved.",
      "fields": [
        {
          "key": "price",
          "label_de": "Kaufpreis netto (EUR)",
          "label_en": "Net Purchase Price (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "vat_rate",
          "label_de": "Umsatzsteuersatz (%)",
          "label_en": "VAT Rate (%)",
          "type": "select",
          "required": false,
          "options": [
            "19",
            "7",
            "0 (steuerfrei)"
          ]
        },
        {
          "key": "payment_days",
          "label_de": "Zahlungsziel (Tage)",
          "label_en": "Payment Term (Days)",
          "type": "text",
          "required": false
        },
        {
          "key": "payment_method",
          "label_de": "Zahlungsmethode",
          "label_en": "Payment Method",
          "type": "select",
          "required": false,
          "options": [
            "Überweisung",
            "SEPA-Lastschrift",
            "Barzahlung",
            "Kreditkarte",
            "PayPal"
          ]
        },
        {
          "key": "discount_days",
          "label_de": "Skontofrist (Tage)",
          "label_en": "Discount Period (Days)",
          "type": "text",
          "required": false
        },
        {
          "key": "discount_percent",
          "label_de": "Skontosatz (%)",
          "label_en": "Discount Rate (%)",
          "type": "text",
          "required": false
        },
        {
          "key": "late_interest",
          "label_de": "Verzugszins (Prozentpunkte über Basiszinssatz)",
          "label_en": "Default Interest (Percentage Points Above Base Rate)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Lieferung und Versand",
      "title_en": "Delivery and Shipping",
      "content_de": "Die Lieferung erfolgt bis spätestens {{delivery_date}} an den Lieferort {{delivery_address}}. Es gilt die Lieferklausel {{incoterm}} (INCOTERMS 2020). Die Versandkosten in Höhe von {{shipping_cost}} EUR trägt {{shipping_cost_bearer}}. Teillieferungen sind {{partial_delivery}}. Der Verkäufer ist berechtigt, die Lieferung durch Dritte (Spediteure, Frachtführer) ausführen zu lassen.",
      "content_en": "Delivery shall be made no later than {{delivery_date}} to the delivery address {{delivery_address}}. The delivery clause {{incoterm}} (INCOTERMS 2020) applies. Shipping costs amounting to {{shipping_cost}} EUR shall be borne by {{shipping_cost_bearer}}. Partial deliveries are {{partial_delivery}}. The Seller is entitled to have the delivery carried out by third parties (forwarding agents, carriers).",
      "fields": [
        {
          "key": "delivery_date",
          "label_de": "Liefertermin",
          "label_en": "Delivery Date",
          "type": "date",
          "required": false
        },
        {
          "key": "delivery_address",
          "label_de": "Lieferadresse",
          "label_en": "Delivery Address",
          "type": "text",
          "required": false
        },
        {
          "key": "incoterm",
          "label_de": "Lieferklausel (INCOTERMS)",
          "label_en": "Delivery Clause (INCOTERMS)",
          "type": "select",
          "required": false,
          "options": [
            "EXW (ab Werk)",
            "FCA (frei Frachtführer)",
            "CPT (frachtfrei)",
            "CIP (frachtfrei versichert)",
            "DAP (geliefert benannter Ort)",
            "DDP (geliefert verzollt)"
          ]
        },
        {
          "key": "shipping_cost",
          "label_de": "Versandkosten (EUR)",
          "label_en": "Shipping Cost (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "shipping_cost_bearer",
          "label_de": "Versandkosten trägt",
          "label_en": "Shipping Costs Borne By",
          "type": "select",
          "required": false,
          "options": [
            "Verkäufer",
            "Käufer"
          ]
        },
        {
          "key": "partial_delivery",
          "label_de": "Teillieferungen",
          "label_en": "Partial Deliveries",
          "type": "select",
          "required": false,
          "options": [
            "nicht zulässig",
            "zulässig",
            "nach Absprache"
          ]
        }
      ]
    },
    {
      "title_de": "Gefahrübergang und Eigentumsvorbehalt",
      "title_en": "Transfer of Risk and Retention of Title",
      "content_de": "Die Gefahr geht mit Übergabe der Ware an den Käufer oder den von ihm beauftragten Dritten über. Bei Versendungskauf geht die Gefahr gemäß § 447 BGB bereits mit Übergabe an die Transportperson auf den Käufer über. Der Verkäufer behält sich das Eigentum an der Ware bis zur vollständigen Bezahlung des Kaufpreises vor (einfacher Eigentumsvorbehalt gemäß § 449 BGB). Der Käufer ist nicht berechtigt, die Vorbehaltsware vor vollständiger Zahlung an Dritte zu veräußern oder zu verpfänden. Für den Fall des Weiterverkaufs wird der verlängerte Eigentumsvorbehalt vereinbart: Der Käufer tritt bereits jetzt seine Forderungen aus dem Weiterverkauf an den Verkäufer ab.",
      "content_en": "Risk passes upon handover of the goods to the Buyer or a third party commissioned by the Buyer. In the case of mail-order purchase, risk passes to the Buyer upon handover to the transport person pursuant to § 447 BGB. The Seller retains title to the goods until full payment of the purchase price (simple retention of title pursuant to § 449 BGB). The Buyer is not entitled to sell or pledge the goods subject to retention of title to third parties before full payment. In the event of resale, extended retention of title is agreed: the Buyer hereby assigns its claims from resale to the Seller.",
      "fields": [
        {
          "key": "risk_transfer_point",
          "label_de": "Gefahrübergang",
          "label_en": "Risk Transfer Point",
          "type": "select",
          "required": false,
          "options": [
            "Übergabe an Käufer",
            "Übergabe an Transportperson (§ 447 BGB)",
            "gemäß INCOTERMS"
          ]
        },
        {
          "key": "retention_of_title",
          "label_de": "Eigentumsvorbehalt",
          "label_en": "Retention of Title",
          "type": "select",
          "required": false,
          "options": [
            "einfacher Eigentumsvorbehalt (§ 449 BGB)",
            "verlängerter Eigentumsvorbehalt",
            "weitergeleiteter Eigentumsvorbehalt",
            "kein Eigentumsvorbehalt"
          ]
        }
      ]
    },
    {
      "title_de": "Abnahme und Untersuchungspflicht",
      "title_en": "Acceptance and Inspection Duty",
      "content_de": "Der Käufer ist verpflichtet, die Ware unverzüglich nach Lieferung zu untersuchen (§ 377 HGB). Offensichtliche Mängel sind dem Verkäufer innerhalb von {{inspection_period}} Tagen nach Lieferung schriftlich anzuzeigen. Verdeckte Mängel sind unverzüglich nach Entdeckung anzuzeigen. Unterlässt der Käufer die Anzeige, gilt die Ware als genehmigt, sofern es sich nicht um einen Mangel handelt, der bei der Untersuchung nicht erkennbar war. Die Abnahme gilt als erfolgt, wenn der Käufer die Ware nicht innerhalb von {{acceptance_deemed_days}} Tagen nach Lieferung schriftlich beanstandet. Eine Abnahme durch schlüssiges Verhalten (z.B. Inbetriebnahme, Verarbeitung) bleibt vorbehalten.",
      "content_en": "The Buyer is obligated to inspect the goods immediately after delivery (§ 377 HGB). Obvious defects must be reported to the Seller in writing within {{inspection_period}} days of delivery. Hidden defects must be reported immediately upon discovery. If the Buyer fails to give notice, the goods are deemed approved, unless the defect was not recognizable upon inspection. Acceptance is deemed to have occurred if the Buyer does not object in writing within {{acceptance_deemed_days}} days of delivery. Acceptance by conclusive conduct (e.g., commissioning, processing) remains reserved.",
      "fields": [
        {
          "key": "inspection_period",
          "label_de": "Untersuchungsfrist für offensichtliche Mängel (Tage)",
          "label_en": "Inspection Period for Obvious Defects (Days)",
          "type": "text",
          "required": false
        },
        {
          "key": "acceptance_deemed_days",
          "label_de": "Fiktion der Abnahme nach (Tage)",
          "label_en": "Deemed Acceptance After (Days)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Gewährleistung und Mängelhaftung",
      "title_en": "Warranty and Defect Liability",
      "content_de": "Die Gewährleistungsfrist beträgt {{warranty_period}} Monate ab Gefahrübergang. Der Verkäufer haftet für Sachmängel nach §§ 434, 437 BGB. Der Käufer hat bei Vorliegen eines Mangels nach seiner Wahl Anspruch auf Nacherfüllung durch Beseitigung des Mangels (Nachbesserung) oder Lieferung einer mangelfreien Sache (Nachlieferung) gemäß § 439 BGB. Schlägt die Nacherfüllung fehl, ist der Käufer berechtigt, vom Vertrag zurückzutreten (§ 440 BGB, § 323 BGB) oder den Kaufpreis zu mindern (§ 441 BGB). Schadensersatzansprüche bestehen nur nach Maßgabe von § 440 BGB und § 280 BGB. Die Verjährungsfrist für Mängelansprüche beginnt mit der Ablieferung der Sache (§ 438 BGB). Für gebrauchte Sachen kann die Gewährleistungsfrist auf {{used_goods_warranty_months}} Monate verkürzt werden.",
      "content_en": "The warranty period is {{warranty_period}} months from the transfer of risk. The Seller is liable for material defects pursuant to §§ 434, 437 BGB. In the event of a defect, the Buyer is entitled at its option to subsequent performance by repair or replacement delivery pursuant to § 439 BGB. If subsequent performance fails, the Buyer is entitled to withdraw from the contract (§ 440 BGB, § 323 BGB) or reduce the purchase price (§ 441 BGB). Claims for damages exist only in accordance with § 440 BGB and § 280 BGB. The limitation period for defect claims begins upon delivery of the item (§ 438 BGB). For used goods, the warranty period may be reduced to {{used_goods_warranty_months}} months.",
      "fields": [
        {
          "key": "warranty_period",
          "label_de": "Gewährleistungsfrist (Monate)",
          "label_en": "Warranty Period (Months)",
          "type": "text",
          "required": false
        },
        {
          "key": "used_goods_warranty_months",
          "label_de": "Gewährleistungsfrist für gebrauchte Ware (Monate)",
          "label_en": "Warranty Period for Used Goods (Months)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Produkthaftung und Versicherung",
      "title_en": "Product Liability and Insurance",
      "content_de": "Der Verkäufer verfügt über eine Produkthaftpflichtversicherung mit einer Deckungssumme von {{product_liability_coverage}} EUR. Eine Kopie der Versicherungspolice wird dem Käufer auf Verlangen vorgelegt. Der Verkäufer stellt den Käufer von allen Ansprüchen Dritter aus der Produkthaftung nach dem Produkthaftungsgesetz (ProdHaftG) frei, soweit der Mangel auf einem vom Verkäufer zu vertretenden Umstand beruht. Der Käufer ist verpflichtet, den Verkäufer unverzüglich über etwaige Produkthaftungsfälle zu informieren.",
      "content_en": "The Seller maintains product liability insurance with coverage of {{product_liability_coverage}} EUR. A copy of the insurance policy shall be provided to the Buyer upon request. The Seller indemnifies the Buyer from all third-party claims arising from product liability under the Product Liability Act (ProdHaftG), insofar as the defect is based on a circumstance attributable to the Seller. The Buyer is obligated to inform the Seller immediately of any product liability incidents.",
      "fields": [
        {
          "key": "product_liability_coverage",
          "label_de": "Deckungssumme Produkthaftpflicht (EUR)",
          "label_en": "Product Liability Coverage (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "product_liability_insurer",
          "label_de": "Versicherer (Produkthaftpflicht)",
          "label_en": "Insurer (Product Liability)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Haftung und Vertragsstrafe",
      "title_en": "Liability and Contractual Penalties",
      "content_de": "Kommt der Verkäufer mit der Lieferung in Verzug, schuldet er eine Vertragsstrafe in Höhe von {{penalty_percent}}% des Kaufpreises je angefangener Woche des Verzugs, maximal jedoch {{penalty_max}}% des Kaufpreises. Die Haftung des Verkäufers für Schäden, die nicht auf Vorsatz oder grober Fahrlässigkeit beruhen, ist auf den Auftragswert begrenzt ({{liability_cap}} EUR). Diese Haftungsbegrenzung gilt nicht bei Verletzung von Leben, Körper oder Gesundheit und bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). Im Falle der Verletzung von Kardinalpflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.",
      "content_en": "If the Seller is in default of delivery, the Seller shall pay a contractual penalty of {{penalty_percent}}% of the purchase price per commenced week of delay, but no more than {{penalty_max}}% of the purchase price. The Seller's liability for damages not caused by intent or gross negligence is limited to the order value ({{liability_cap}} EUR). This limitation of liability does not apply to injury to life, body or health or to breach of essential contractual obligations (cardinal obligations). In the event of breach of cardinal obligations, liability is limited to the contract-typical, foreseeable damage. Liability under the Product Liability Act remains unaffected.",
      "fields": [
        {
          "key": "penalty_percent",
          "label_de": "Vertragsstrafe (% pro Woche Verzug)",
          "label_en": "Contractual Penalty (% per Week of Delay)",
          "type": "text",
          "required": false
        },
        {
          "key": "penalty_max",
          "label_de": "Maximale Vertragsstrafe (% des Kaufpreises)",
          "label_en": "Maximum Penalty (% of Purchase Price)",
          "type": "text",
          "required": false
        },
        {
          "key": "liability_cap",
          "label_de": "Haftungsobergrenze (EUR)",
          "label_en": "Liability Cap (EUR)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Höhere Gewalt",
      "title_en": "Force Majeure",
      "content_de": "Keine Partei ist verpflichtet, ihre vertraglichen Verpflichtungen zu erfüllen, soweit die Erfüllung durch höhere Gewalt unmöglich oder unzumutbar wird. Höhere Gewalt umfasst insbesondere Naturkatastrophen, Epidemien/Pandemien, Krieg, Terroranschläge, Embargos, behördliche Anordnungen, allgemeine Rohstoffknappheit, Streiks und Aussperrungen, schwere Betriebsstörungen (z.B. Brand, Explosion). Die betroffene Partei hat die andere Partei unverzüglich über das Vorliegen höherer Gewalt zu informieren. Bei Fortdauer von mehr als {{force_majeure_days}} Tagen ist jede Partei berechtigt, den Vertrag außerordentlich zu kündigen.",
      "content_en": "Neither party is obligated to perform its contractual obligations to the extent that performance is rendered impossible or unreasonable by force majeure. Force majeure includes in particular natural disasters, epidemics/pandemics, war, terrorist attacks, embargoes, governmental orders, general raw material shortages, strikes and lockouts, serious operational disruptions (e.g., fire, explosion). The affected party shall immediately inform the other party of the occurrence of force majeure. If force majeure persists for more than {{force_majeure_days}} days, each party is entitled to terminate the contract extraordinarily.",
      "fields": [
        {
          "key": "force_majeure_days",
          "label_de": "Höhere-Gewalt-Frist vor Kündigung (Tage)",
          "label_en": "Force Majeure Period Before Termination (Days)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court}}. Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Anstelle der unwirksamen Bestimmung gilt eine wirksame Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung möglichst nahekommt. Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Schriftformklausel. Ort: {{place}}, Datum: {{date}}. Es werden zwei gleichlautende Ausfertigungen erstellt.",
      "content_en": "Place of jurisdiction is {{court}}. The law of the Federal Republic of Germany applies, excluding the UN Convention on Contracts for the International Sale of Goods (CISG). Should any provision of this contract be or become invalid, the remainder of the contract shall remain effective. In place of the invalid provision, a valid provision shall apply that comes as close as possible to the economic purpose of the invalid provision. Amendments and supplements to this contract require written form; this also applies to the waiver of this written form clause. Place: {{place}}, Date: {{date}}. Two identical counterparts shall be executed.",
      "fields": [
        {
          "key": "court",
          "label_de": "Gerichtsstand",
          "label_en": "Place of Jurisdiction",
          "type": "text",
          "required": false
        },
        {
          "key": "place",
          "label_de": "Ort der Vertragsunterzeichnung",
          "label_en": "Place of Signing",
          "type": "text",
          "required": false
        },
        {
          "key": "date",
          "label_de": "Datum der Vertragsunterzeichnung",
          "label_en": "Date of Signing",
          "type": "date",
          "required": false
        }
      ]
    }
  ],
  "fileData": null,
  "fileName": null,
  "createdAt": "2026-05-31T00:00:00.000Z"
}
,
  {
  "id": 2,
  "category_id": 2,
  "title_de": "Standard-Mietvertrag",
  "title_en": "Standard Lease Agreement",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{landlord_name}}, {{landlord_address}} (im Folgenden \"Vermieter\") und {{tenant_name}}, {{tenant_address}} (im Folgenden \"Mieter\") wird folgender Mietvertrag über Wohnraum gemäß §§ 535 ff. BGB geschlossen:",
      "content_en": "Between {{landlord_name}}, {{landlord_address}} (hereinafter \"Landlord\") and {{tenant_name}}, {{tenant_address}} (hereinafter \"Tenant\") the following lease agreement for residential premises is concluded pursuant to §§ 535 ff. BGB:",
      "fields": [
        {
          "key": "landlord_name",
          "label_de": "Name des Vermieters",
          "label_en": "Landlord Name",
          "type": "text",
          "required": false
        },
        {
          "key": "landlord_address",
          "label_de": "Adresse des Vermieters",
          "label_en": "Landlord Address",
          "type": "text",
          "required": false
        },
        {
          "key": "tenant_name",
          "label_de": "Name des Mieters",
          "label_en": "Tenant Name",
          "type": "text",
          "required": false
        },
        {
          "key": "tenant_address",
          "label_de": "Adresse des Mieters",
          "label_en": "Tenant Address",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Mietgegenstand",
      "title_en": "Leased Property",
      "content_de": "Der Vermieter vermietet an den Mieter die im Folgenden bezeichnete Wohnung/Räumlichkeit: {{property_description}}. Die genaue Adresse lautet {{property_address}}, {{property_floor}}. OG, {{property_location_description}}. Die Wohnfläche beträgt ca. {{property_area}} m². Die Wohnung besteht aus {{property_rooms}} Zimmern (davon {{property_bedrooms}} Schlafzimmer). Zur Wohnung gehört {{property_balcony}}. Die Wohnung ist ausgestattet mit {{property_furnishings}}.",
      "content_en": "The Landlord leases to the Tenant the following apartment/premises: {{property_description}}. The exact address is {{property_address}}, floor {{property_floor}}, {{property_location_description}}. The living area is approximately {{property_area}} sqm. The apartment comprises {{property_rooms}} rooms (including {{property_bedrooms}} bedrooms). The apartment includes {{property_balcony}}. The apartment is furnished with {{property_furnishings}}.",
      "fields": [
        {
          "key": "property_description",
          "label_de": "Beschreibung des Mietobjekts",
          "label_en": "Description of Leased Property",
          "type": "textarea",
          "required": false
        },
        {
          "key": "property_address",
          "label_de": "Adresse des Mietobjekts",
          "label_en": "Property Address",
          "type": "text",
          "required": false
        },
        {
          "key": "property_floor",
          "label_de": "Etage",
          "label_en": "Floor",
          "type": "text",
          "required": false
        },
        {
          "key": "property_location_description",
          "label_de": "Lagebeschreibung",
          "label_en": "Location Description",
          "type": "textarea",
          "required": false
        },
        {
          "key": "property_area",
          "label_de": "Wohnfläche (m²)",
          "label_en": "Living Area (sqm)",
          "type": "text",
          "required": false
        },
        {
          "key": "property_rooms",
          "label_de": "Anzahl der Zimmer insgesamt",
          "label_en": "Total Number of Rooms",
          "type": "text",
          "required": false
        },
        {
          "key": "property_bedrooms",
          "label_de": "Anzahl der Schlafzimmer",
          "label_en": "Number of Bedrooms",
          "type": "text",
          "required": false
        },
        {
          "key": "property_balcony",
          "label_de": "Balkon/Terrasse/Garten",
          "label_en": "Balcony/Terrace/Garden",
          "type": "text",
          "required": false
        },
        {
          "key": "property_furnishings",
          "label_de": "Ausstattung (Einbauküche, Bad, Bodenbeläge etc.)",
          "label_en": "Furnishings (Fitted Kitchen, Bathroom, Flooring etc.)",
          "type": "textarea",
          "required": false
        }
      ]
    },
    {
      "title_de": "Mietzweck",
      "title_en": "Purpose of Lease",
      "content_de": "Die Mietsache wird zu folgendem Zweck gemietet: {{lease_purpose}}. Eine Nutzung zu anderen als dem vereinbarten Zweck bedarf der vorherigen schriftlichen Zustimmung des Vermieters. Bei gewerblicher Mitnutzung gelten die vereinbarten Regelungen der gewerblichen Zwischenvermietung nach Maßgabe der Parteien.",
      "content_en": "The leased property is rented for the following purpose: {{lease_purpose}}. Use for purposes other than the agreed purpose requires the prior written consent of the Landlord. In the case of partial commercial use, the agreed regulations for commercial subletting apply as determined by the parties.",
      "fields": [
        {
          "key": "lease_purpose",
          "label_de": "Nutzungszweck",
          "label_en": "Purpose of Use",
          "type": "select",
          "required": false,
          "options": [
            "reine Wohnnutzung",
            "Wohnen mit gelegentlicher Homeoffice-Nutzung",
            "Wohnen und gewerbliche Mitnutzung",
            "reine gewerbliche Nutzung"
          ]
        }
      ]
    },
    {
      "title_de": "Miete und Nebenkosten",
      "title_en": "Rent and Operating Costs",
      "content_de": "Die monatliche Grundmiete (Kaltmiete) beträgt {{cold_rent}} EUR. Die Vorauszahlung für Betriebskosten beträgt {{utilities_advance}} EUR monatlich. Die Vorauszahlung für Heizkosten beträgt {{heating_advance}} EUR monatlich. Die Gesamtmiete beträgt somit {{total_rent}} EUR monatlich. Die Miete ist spätestens am {{rent_payment_day}}. Werktag eines jeden Monats im Voraus auf das folgende Konto zu zahlen: {{landlord_account}}. Eine Mieterhöhung ist gemäß § 557 BGB (Miethöhe bei Mietbeginn, Mieterhöhung bis zur ortsüblichen Vergleichsmiete) möglich. Die Zustimmung des Mieters zu einer Mieterhöhung nach § 558 BGB kann verlangt werden. Staffelmietvereinbarungen und Indexmietvereinbarungen bleiben vorbehalten.",
      "content_en": "The monthly base rent (cold rent) amounts to {{cold_rent}} EUR. The advance payment for operating costs amounts to {{utilities_advance}} EUR monthly. The advance payment for heating costs amounts to {{heating_advance}} EUR monthly. The total rent is thus {{total_rent}} EUR monthly. Rent shall be paid by the {{rent_payment_day}}th working day of each month in advance to the following account: {{landlord_account}}. Rent increases are possible pursuant to § 557 BGB (rent level at commencement, rent increase up to local comparative rent). Consent to a rent increase pursuant to § 558 BGB may be requested. Stepped rent agreements and index-linked rent agreements remain reserved.",
      "fields": [
        {
          "key": "cold_rent",
          "label_de": "Kaltmiete (EUR/Monat)",
          "label_en": "Cold Rent (EUR/Month)",
          "type": "text",
          "required": false
        },
        {
          "key": "utilities_advance",
          "label_de": "Betriebskostenvorauszahlung (EUR/Monat)",
          "label_en": "Operating Costs Advance (EUR/Month)",
          "type": "text",
          "required": false
        },
        {
          "key": "heating_advance",
          "label_de": "Heizkostenvorauszahlung (EUR/Monat)",
          "label_en": "Heating Cost Advance (EUR/Month)",
          "type": "text",
          "required": false
        },
        {
          "key": "total_rent",
          "label_de": "Gesamtmiete (EUR/Monat)",
          "label_en": "Total Rent (EUR/Month)",
          "type": "text",
          "required": false
        },
        {
          "key": "rent_payment_day",
          "label_de": "Zahlungstag (Werktag des Monats)",
          "label_en": "Payment Day (Working Day of Month)",
          "type": "select",
          "required": false,
          "options": [
            "1.",
            "2.",
            "3.",
            "5."
          ]
        },
        {
          "key": "landlord_account",
          "label_de": "Konto des Vermieters (IBAN)",
          "label_en": "Landlord's Account (IBAN)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Kaution",
      "title_en": "Security Deposit",
      "content_de": "Der Mieter leistet eine Kaution in Höhe von {{deposit_amount}} EUR (maximal drei Nettokaltmieten gemäß § 551 BGB). Die Kaution ist wie folgt zu erbringen: {{deposit_method}}. Bei Zahlung in bar ist die Kaution vom Vermieter getrennt von seinem Vermögen bei einem Kreditinstitut zu dem für Spareinlagen üblichen Zinssatz anzulegen (§ 551 Abs. 3 BGB). Die Zinsen stehen dem Mieter zu. Die Rückzahlung der Kaution erfolgt nach Beendigung des Mietverhältnisses und vollständiger Abrechnung der Betriebskosten, längstens jedoch {{deposit_return_months}} Monate nach Rückgabe der Mietsache, sofern keine Gegenansprüche des Vermieters bestehen.",
      "content_en": "The Tenant provides a security deposit of {{deposit_amount}} EUR (maximum three months' net cold rent pursuant to § 551 BGB). The deposit shall be provided as follows: {{deposit_method}}. In case of cash payment, the Landlord must hold the deposit separately from its assets in an account at a credit institution at the customary interest rate for savings deposits (§ 551 para. 3 BGB). Interest accrues to the Tenant. The deposit shall be returned after termination of the tenancy and full settlement of operating costs, but no later than {{deposit_return_months}} months after return of the leased property, provided the Landlord has no counterclaims.",
      "fields": [
        {
          "key": "deposit_amount",
          "label_de": "Kautionshöhe (EUR)",
          "label_en": "Deposit Amount (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "deposit_method",
          "label_de": "Art der Kautionsleistung",
          "label_en": "Method of Deposit",
          "type": "select",
          "required": false,
          "options": [
            "Barkaution",
            "Sparbuch/Kaution auf Mietkautionskonto",
            "Mietkautionsbürgschaft",
            "Ratenzahlung (§ 551 Abs. 2 BGB)"
          ]
        },
        {
          "key": "deposit_return_months",
          "label_de": "Rückzahlungsfrist der Kaution (Monate)",
          "label_en": "Deposit Repayment Period (Months)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Mietdauer und Kündigung",
      "title_en": "Term and Termination",
      "content_de": "Das Mietverhältnis beginnt am {{start_date}}. Es wird auf {{lease_term}} geschlossen. Die gesetzlichen Kündigungsfristen gemäß § 573c Abs. 1 BGB betragen: für den Mieter drei Monate; für den Vermieter gestaffelt nach Mietdauer (drei Monate bis fünf Jahre, sechs Monate ab fünf Jahren, neun Monate ab acht Jahren). Das Recht zur außerordentlichen Kündigung aus wichtigem Grund gemäß § 543 BGB und zur Kündigung bei vertragswidrigem Gebrauch gemäß § 569 BGB bleibt unberührt. Die Kündigung bedarf der Schriftform (§ 568 BGB). Der Vermieter kann nur kündigen, wenn ein berechtigtes Interesse im Sinne von § 573 BGB vorliegt.",
      "content_en": "The tenancy commences on {{start_date}}. It is concluded for {{lease_term}}. The statutory notice periods pursuant to § 573c para. 1 BGB are: for the Tenant three months; for the Landlord graduated by duration of tenancy (three months up to five years, six months from five years, nine months from eight years). The right to extraordinary termination for good cause pursuant to § 543 BGB and termination due to improper use pursuant to § 569 BGB remains unaffected. Termination requires written form (§ 568 BGB). The Landlord may only terminate if it has a legitimate interest within the meaning of § 573 BGB.",
      "fields": [
        {
          "key": "start_date",
          "label_de": "Mietbeginn",
          "label_en": "Commencement Date",
          "type": "date",
          "required": false
        },
        {
          "key": "lease_term",
          "label_de": "Vertragslaufzeit",
          "label_en": "Lease Term",
          "type": "select",
          "required": false,
          "options": [
            "unbefristet",
            "befristet auf 1 Jahr",
            "befristet auf 2 Jahre",
            "befristet auf 3 Jahre",
            "befristet auf 5 Jahre"
          ]
        }
      ]
    },
    {
      "title_de": "Betriebskosten",
      "title_en": "Operating Costs",
      "content_de": "Die Betriebskosten werden gemäß der Betriebskostenverordnung (BetrKV) abgerechnet. Umlagefähige Betriebskosten im Sinne von § 556 BGB i.V.m. § 2 BetrKV umfassen insbesondere: (1) laufende öffentliche Lasten (Grundsteuer), (2) Kosten der Wasserversorgung, (3) Kosten der Entwässerung (Abwasser), (4) Heizkosten gemäß Heizkostenverordnung, (5) Kosten der Warmwasserversorgung, (6) Kosten der Gebäudereinigung, (7) Kosten der Gartenpflege, (8) Kosten der Beleuchtung, (9) Schornsteinfegerkosten, (10) Gebäudereinigungskosten, (11) Hauswartkosten, (12) Kosten der Hausverwaltung, (13) Kosten der Gebäudeversicherung, (14) Kosten der Haftpflichtversicherung, (15) Kosten für Aufzug, (16) Kosten für Müllbeseitigung. Die Abrechnung erfolgt jährlich bis zum Ablauf des {{utility_settlement_months}}. Folgenden Monats nach Ende des Abrechnungszeitraums. Nachzahlungen oder Guthaben sind innerhalb von {{utility_payment_days}} Tagen nach Zugang der Abrechnung fällig. Heizkosten sind nach der Heizkostenverordnung (HeizKV) zu verteilen.",
      "content_en": "Operating costs are settled in accordance with the Operating Costs Regulation (BetrKV). Service charges within the meaning of § 556 BGB in conjunction with § 2 BetrKV include in particular: (1) ongoing public charges (property tax), (2) water supply costs, (3) drainage/wastewater costs, (4) heating costs pursuant to the Heating Costs Regulation, (5) hot water supply costs, (6) building cleaning costs, (7) garden maintenance costs, (8) lighting costs, (9) chimney sweep costs, (10) building cleaning costs, (11) caretaker costs, (12) property management costs, (13) building insurance costs, (14) liability insurance costs, (15) elevator costs, (16) waste disposal costs. The settlement is made annually by the end of the {{utility_settlement_months}}th month following the end of the billing period. Additional payments or credits are due within {{utility_payment_days}} days of receipt of the settlement. Heating costs are to be allocated according to the Heating Costs Regulation (HeizKV).",
      "fields": [
        {
          "key": "utility_settlement_months",
          "label_de": "Abrechnungsfrist nach Abrechnungszeitraum (Monate)",
          "label_en": "Settlement Period After Billing Period (Months)",
          "type": "text",
          "required": false
        },
        {
          "key": "utility_payment_days",
          "label_de": "Zahlungsfrist für Nachzahlungen (Tage)",
          "label_en": "Payment Period for Additional Charges (Days)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Instandhaltung und Schönheitsreparaturen",
      "title_en": "Maintenance and Cosmetic Repairs",
      "content_de": "Der Vermieter trägt die Kosten für die Instandhaltung und Instandsetzung der Mietsache, insbesondere für die Instandhaltung von Dach, Fach, Außenwänden, Fensterrahmen, Versorgungsleitungen und gemeinschaftlichen Einrichtungen. Schönheitsreparaturen sind {{cosmetic_repairs_clause}}. Die Schönheitsreparaturen umfassen Tapezieren, Anstreichen von Wänden und Decken, Streichen von Heizkörpern einschließlich Heizungsrohren, Streichen von Innentüren sowie Streichen von Fenstern und Außentüren von innen. Die Fristen für Schönheitsreparaturen betragen in der Regel: für Küchen, Bäder und Duschen alle {{renovation_kitchen_years}} Jahre, für Wohn- und Schlafräume, Flure, Dielen und Toiletten alle {{renovation_living_years}} Jahre und für andere Nebenräume alle {{renovation_other_years}} Jahre. Kleinreparaturen bis zu {{minor_repair_limit}} EUR pro Schadensfall und maximal {{minor_repair_annual_limit}} EUR jährlich trägt der Mieter, wenn sie an häufig genutzten Gegenständen (Armaturen, Steckdosen, Tür- und Fenstergriffe etc.) anfallen.",
      "content_en": "The Landlord bears the costs for the maintenance and repair of the leased property, in particular for the maintenance of the roof, structural elements, exterior walls, window frames, supply lines and common facilities. Cosmetic repairs are {{cosmetic_repairs_clause}}. Cosmetic repairs include papering, painting walls and ceilings, painting radiators including heating pipes, painting interior doors, and painting windows and exterior doors from the inside. The intervals for cosmetic repairs are generally: for kitchens, bathrooms and showers every {{renovation_kitchen_years}} years, for living and sleeping rooms, corridors, hallways and toilets every {{renovation_living_years}} years, and for other ancillary rooms every {{renovation_other_years}} years. Minor repairs up to {{minor_repair_limit}} EUR per damage event and a maximum of {{minor_repair_annual_limit}} EUR per year are borne by the Tenant if they occur on frequently used items (fittings, sockets, door and window handles, etc.).",
      "fields": [
        {
          "key": "cosmetic_repairs_clause",
          "label_de": "Schönheitsreparaturen-Regelung",
          "label_en": "Cosmetic Repairs Clause",
          "type": "select",
          "required": false,
          "options": [
            "Mieter verpflichtet sich zur Durchführung",
            "nicht auf Mieter übertragen (Vermieter trägt Kosten)",
            "nach Absprache und gegen Kostenbeteiligung"
          ]
        },
        {
          "key": "renovation_kitchen_years",
          "label_de": "Renovierungsintervall Küche/Bad (Jahre)",
          "label_en": "Renovation Interval Kitchen/Bath (Years)",
          "type": "text",
          "required": false
        },
        {
          "key": "renovation_living_years",
          "label_de": "Renovierungsintervall Wohnräume (Jahre)",
          "label_en": "Renovation Interval Living Rooms (Years)",
          "type": "text",
          "required": false
        },
        {
          "key": "renovation_other_years",
          "label_de": "Renovierungsintervall Nebenräume (Jahre)",
          "label_en": "Renovation Interval Ancillary Rooms (Years)",
          "type": "text",
          "required": false
        },
        {
          "key": "minor_repair_limit",
          "label_de": "Kleinreparaturgrenze pro Fall (EUR)",
          "label_en": "Minor Repair Limit per Case (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "minor_repair_annual_limit",
          "label_de": "Kleinreparatur-Jahresgrenze (EUR)",
          "label_en": "Minor Repair Annual Limit (EUR)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Versicherungen",
      "title_en": "Insurance",
      "content_de": "Der Vermieter hat eine Wohngebäudeversicherung (einschließlich Feuer-, Sturm-, Hagel-, Leitungswasser- und Elementarschäden) sowie eine Haftpflichtversicherung für das Gebäude abgeschlossen. Der Mieter wird gebeten, den Abschluss einer Haftpflichtversicherung (Privathaftpflicht) nachzuweisen. Der Mieter wird ermutigt, eine Hausratversicherung für seine Einrichtungsgegenstände abzuschließen, da diese nicht durch die Gebäudeversicherung des Vermieters gedeckt sind. Eine Glasversicherung kann auf Wunsch des Vermieters abgeschlossen werden: {{glass_insurance_required}}.",
      "content_en": "The Landlord has taken out building insurance (including fire, storm, hail, water damage and elemental damage) as well as liability insurance for the building. The Tenant is requested to provide evidence of personal liability insurance. The Tenant is encouraged to take out household contents insurance for their furnishings, as these are not covered by the Landlord's building insurance. Glass insurance may be taken out at the Landlord's request: {{glass_insurance_required}}.",
      "fields": [
        {
          "key": "glass_insurance_required",
          "label_de": "Glasversicherung erforderlich",
          "label_en": "Glass Insurance Required",
          "type": "select",
          "required": false,
          "options": [
            "ja",
            "nein",
            "optional"
          ]
        }
      ]
    },
    {
      "title_de": "Haustiere, Untervermietung, bauliche Änderungen",
      "title_en": "Pets, Subletting, Structural Changes",
      "content_de": "Das Halten von Haustieren ist {{pets_allowed}}. Die Untervermietung von Wohnraum an Dritte bedarf der vorherigen schriftlichen Zustimmung des Vermieters (§ 540 BGB). Der Mieter hat bei berechtigtem Interesse (§ 553 BGB) einen Anspruch auf Erlaubnis zur Untervermietung eines Teils des Wohnraums. Bauliche Veränderungen an der Mietsache (insbesondere Bohrungen durch Außenwände, Veränderungen an Elektro- oder Wasserinstallationen, Einbau von Satellitenschüsseln) bedürfen der vorherigen schriftlichen Zustimmung des Vermieters. Der Mieter ist verpflichtet, auf Verlangen des Vermieters den ursprünglichen Zustand wiederherzustellen, es sei denn, es wurde ein Ausgleich in Geld vereinbart.",
      "content_en": "Keeping pets is {{pets_allowed}}. Subletting of premises to third parties requires the prior written consent of the Landlord (§ 540 BGB). If the Tenant has a legitimate interest (§ 553 BGB), the Tenant is entitled to permission for subletting part of the premises. Structural alterations to the leased property (in particular drilling through exterior walls, modifications to electrical or water installations, installation of satellite dishes) require the prior written consent of the Landlord. The Tenant is obligated, at the Landlord's request, to restore the original condition, unless monetary compensation has been agreed.",
      "fields": [
        {
          "key": "pets_allowed",
          "label_de": "Haustierhaltung",
          "label_en": "Pets Allowed",
          "type": "select",
          "required": false,
          "options": [
            "keine Haustiere",
            "Kleintiere erlaubt, Hunde/Katzen nach Absprache",
            "alle Haustiere nach vorheriger Zustimmung",
            "Haustiere grundsätzlich erlaubt"
          ]
        }
      ]
    },
    {
      "title_de": "Haftung",
      "title_en": "Liability",
      "content_de": "Der Vermieter haftet für anfängliche Mängel der Mietsache nach § 536a BGB. Für Mängel, die während der Mietzeit entstehen, haftet der Vermieter nur, wenn er die Mängel zu vertreten hat oder mit der Mängelbeseitigung in Verzug ist. Die Haftung des Vermieters für Sach- und Vermögensschäden des Mieters ist auf {{landlord_liability_cap}} EUR beschränkt, es sei denn, die Schäden beruhen auf Vorsatz oder grober Fahrlässigkeit des Vermieters oder seiner Erfüllungsgehilfen oder betreffen die Verletzung von Leben, Körper oder Gesundheit. Der Mieter haftet für Schäden an der Mietsache, die durch seinen Gebrauch verursacht werden, es sei denn, sie beruhen auf normaler Abnutzung. Schadensersatzansprüche des Vermieters wegen Veränderungen oder Verschlechterungen der Mietsache verjähren gemäß § 548 BGB sechs Monate nach Rückgabe der Mietsache.",
      "content_en": "The Landlord is liable for initial defects of the leased property pursuant to § 536a BGB. For defects arising during the tenancy, the Landlord is liable only if it is responsible for the defects or is in default of defect remediation. The Landlord's liability for the Tenant's property and financial losses is limited to {{landlord_liability_cap}} EUR, unless the damages are based on intent or gross negligence of the Landlord or its agents, or involve injury to life, body or health. The Tenant is liable for damage to the leased property caused by its use, unless based on normal wear and tear. The Landlord's claims for damages due to changes or deterioration of the leased property become statute-barred pursuant to § 548 BGB six months after return of the leased property.",
      "fields": [
        {
          "key": "landlord_liability_cap",
          "label_de": "Haftungsobergrenze Vermieter (EUR)",
          "label_en": "Landlord Liability Cap (EUR)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court_rental}}. Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Die unwirksame Bestimmung gilt als durch eine wirksame Regelung ersetzt, die dem wirtschaftlichen Zweck möglichst nahekommt. Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieses Schriftformerfordernisses. Ort: {{place_rental}}, Datum: {{date_rental}}. Es werden zwei Ausfertigungen erstellt, jede Partei erhält eine.",
      "content_en": "Place of jurisdiction is {{court_rental}}. The law of the Federal Republic of Germany applies. Should any provision of this contract be or become invalid, the remainder of the contract shall remain effective. The invalid provision shall be deemed replaced by a valid provision that comes as close as possible to the economic purpose. Amendments and supplements to this contract require written form; this also applies to the waiver of this written form requirement. Place: {{place_rental}}, Date: {{date_rental}}. Two copies shall be executed, each party receives one.",
      "fields": [
        {
          "key": "court_rental",
          "label_de": "Gerichtsstand",
          "label_en": "Place of Jurisdiction",
          "type": "text",
          "required": false
        },
        {
          "key": "place_rental",
          "label_de": "Ort der Vertragsunterzeichnung",
          "label_en": "Place of Signing",
          "type": "text",
          "required": false
        },
        {
          "key": "date_rental",
          "label_de": "Datum der Vertragsunterzeichnung",
          "label_en": "Date of Signing",
          "type": "date",
          "required": false
        }
      ]
    }
  ],
  "fileData": null,
  "fileName": null,
  "createdAt": "2026-05-31T00:00:00.000Z"
}
,
  {
  "id": 3,
  "category_id": 3,
  "title_de": "Standard-Dienstvertrag",
  "title_en": "Standard Service Contract",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{client_name}}, {{client_address}} (im Folgenden \"Auftraggeber\") und {{contractor_name}}, {{contractor_address}} (im Folgenden \"Auftragnehmer\") wird folgender Dienstvertrag gemäß §§ 611 ff. BGB geschlossen:",
      "content_en": "Between {{client_name}}, {{client_address}} (hereinafter \"Client\") and {{contractor_name}}, {{contractor_address}} (hereinafter \"Contractor\") the following service contract is concluded pursuant to §§ 611 ff. BGB:",
      "fields": [
        {
          "key": "client_name",
          "label_de": "Name des Auftraggebers",
          "label_en": "Client Name",
          "type": "text",
          "required": false
        },
        {
          "key": "client_address",
          "label_de": "Adresse des Auftraggebers",
          "label_en": "Client Address",
          "type": "text",
          "required": false
        },
        {
          "key": "contractor_name",
          "label_de": "Name des Auftragnehmers",
          "label_en": "Contractor Name",
          "type": "text",
          "required": false
        },
        {
          "key": "contractor_address",
          "label_de": "Adresse des Auftragnehmers",
          "label_en": "Contractor Address",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Vertragsgegenstand und Leistungsumfang",
      "title_en": "Subject and Scope of Services",
      "content_de": "Der Auftragnehmer erbringt für den Auftraggeber folgende Dienstleistungen: {{service_description}}. Der Leistungsumfang umfasst die im Einzelnen in der Anlage/Leistungsbeschreibung ({{service_spec_document}}) definierten Tätigkeiten. Meilensteine sind: {{milestones}}. Der Auftragnehmer schuldet die sorgfältige Erbringung der Dienstleistungen als solche, nicht einen bestimmten Erfolg. Änderungen des Leistungsumfangs bedürfen der Schriftform.",
      "content_en": "The Contractor shall perform the following services for the Client: {{service_description}}. The scope of services includes the activities defined in detail in the appendix/service specification ({{service_spec_document}}). Milestones are: {{milestones}}. The Contractor owes the careful performance of the services as such, not a specific result. Changes to the scope of services require written form.",
      "fields": [
        {
          "key": "service_description",
          "label_de": "Beschreibung der Dienstleistungen",
          "label_en": "Description of Services",
          "type": "textarea",
          "required": false
        },
        {
          "key": "service_spec_document",
          "label_de": "Leistungsbeschreibung/Anlage",
          "label_en": "Service Specification/Appendix",
          "type": "text",
          "required": false
        },
        {
          "key": "milestones",
          "label_de": "Meilensteine",
          "label_en": "Milestones",
          "type": "textarea",
          "required": false
        }
      ]
    },
    {
      "title_de": "Leistungsort und -zeit",
      "title_en": "Place and Time of Performance",
      "content_de": "Die Dienstleistungen werden an folgendem Ort erbracht: {{service_location}}. Sofern nichts anderes vereinbart ist, bestimmt der Auftragnehmer den Ort der Leistungserbringung nach pflichtgemäßem Ermessen. Der Auftragnehmer wird die Leistungen im Zeitraum vom {{service_start_date}} bis zum {{service_end_date}} erbringen. Die wöchentliche Einsatzzeit beträgt ca. {{weekly_hours}} Stunden. Die genauen Termine werden zwischen den Parteien abgestimmt. Der Auftragnehmer ist berechtigt, die Leistungen durch qualifizierte Mitarbeiter oder Subunternehmer erbringen zu lassen, bleibt jedoch stets persönlich verantwortlich.",
      "content_en": "The services shall be performed at the following location: {{service_location}}. Unless otherwise agreed, the Contractor determines the place of performance in its reasonable discretion. The Contractor shall perform the services in the period from {{service_start_date}} to {{service_end_date}}. The weekly engagement is approximately {{weekly_hours}} hours. The exact dates shall be coordinated between the parties. The Contractor is entitled to have the services performed by qualified employees or subcontractors, but remains personally responsible at all times.",
      "fields": [
        {
          "key": "service_location",
          "label_de": "Leistungsort",
          "label_en": "Place of Service",
          "type": "text",
          "required": false
        },
        {
          "key": "service_start_date",
          "label_de": "Leistungsbeginn",
          "label_en": "Service Start Date",
          "type": "date",
          "required": false
        },
        {
          "key": "service_end_date",
          "label_de": "Leistungsende",
          "label_en": "Service End Date",
          "type": "date",
          "required": false
        },
        {
          "key": "weekly_hours",
          "label_de": "Wöchentliche Einsatzzeit (ca. Stunden)",
          "label_en": "Weekly Engagement (approx. Hours)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Vergütung",
      "title_en": "Remuneration",
      "content_de": "Der Auftraggeber zahlt dem Auftragnehmer eine Vergütung in Höhe von {{service_fee}} EUR (netto zzgl. gesetzlicher Umsatzsteuer). Die Vergütung wird wie folgt fällig: {{payment_schedule}}. Rechnungen sind mit Angabe von Rechnungsnummer, Leistungszeitraum und Umsatzsteuer-Identifikationsnummer zu stellen. Zahlung erfolgt innerhalb von {{payment_days_service}} Tagen nach Rechnungserhalt. Der Auftragnehmer ist berechtigt, angemessene Vorschusszahlungen zu verlangen. Darüber hinaus hat der Auftragnehmer Anspruch auf Ersatz folgender Auslagen und Spesen: {{expenses}}. Reisekosten werden nach dem Bundesreisekostengesetz (BRKG) oder nach folgender Regelung abgerechnet: {{travel_expenses}}. Bei Verzug des Auftraggebers mit Zahlungen ist der Auftragnehmer berechtigt, die weitere Tätigkeit bis zur Zahlung einzustellen.",
      "content_en": "The Client shall pay the Contractor a fee of {{service_fee}} EUR (net plus statutory VAT). The fee shall become due as follows: {{payment_schedule}}. Invoices shall state the invoice number, service period and VAT identification number. Payment is due within {{payment_days_service}} days of receipt of invoice. The Contractor is entitled to request reasonable advance payments. In addition, the Contractor is entitled to reimbursement of the following expenses: {{expenses}}. Travel costs are settled in accordance with the Federal Travel Expenses Act (BRKG) or the following regulation: {{travel_expenses}}. If the Client defaults on payments, the Contractor is entitled to suspend further work until payment is made.",
      "fields": [
        {
          "key": "service_fee",
          "label_de": "Vergütung netto (EUR)",
          "label_en": "Fee Net (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "payment_schedule",
          "label_de": "Zahlungsplan",
          "label_en": "Payment Schedule",
          "type": "select",
          "required": false,
          "options": [
            "einmalig nach Rechnungsstellung",
            "monatlich nach erbrachter Leistung",
            "nach Meilensteinen",
            "als Pauschalvergütung"
          ]
        },
        {
          "key": "payment_days_service",
          "label_de": "Zahlungsziel (Tage)",
          "label_en": "Payment Term (Days)",
          "type": "text",
          "required": false
        },
        {
          "key": "expenses",
          "label_de": "Auslagen und Spesen",
          "label_en": "Expenses",
          "type": "textarea",
          "required": false
        },
        {
          "key": "travel_expenses",
          "label_de": "Reisekostenregelung",
          "label_en": "Travel Expenses Regulation",
          "type": "textarea",
          "required": false
        }
      ]
    },
    {
      "title_de": "Mitwirkungspflichten des Auftraggebers",
      "title_en": "Client's Cooperation Duties",
      "content_de": "Der Auftraggeber ist verpflichtet, dem Auftragnehmer alle für die Erbringung der Dienstleistungen erforderlichen Informationen, Unterlagen und Daten rechtzeitig zur Verfügung zu stellen: {{client_cooperation}}. Der Auftraggeber wird dem Auftragnehmer den erforderlichen Zugang zu seinen Geschäftsräumen, IT-Systemen und sonstigen Ressourcen gewähren: {{client_access}}. Der Auftraggeber stellt sicher, dass die von ihm bereitgestellten Informationen und Materialien vollständig, richtig und aktuell sind. Kommt der Auftraggeber seinen Mitwirkungspflichten nicht oder nicht rechtzeitig nach, ist der Auftragnehmer berechtigt, die Leistung zu verweigern und einen veränderten Zeitplan einseitig festzulegen. Der Auftraggeber trägt die Kosten etwaiger Verzögerungen, die auf die Verletzung seiner Mitwirkungspflichten zurückzuführen sind.",
      "content_en": "The Client is obligated to provide the Contractor with all information, documents and data required for the performance of the services in a timely manner: {{client_cooperation}}. The Client shall grant the Contractor the necessary access to its premises, IT systems and other resources: {{client_access}}. The Client ensures that the information and materials provided are complete, correct and up to date. If the Client fails to fulfill its cooperation duties in whole or in part, the Contractor is entitled to refuse performance and unilaterally determine a revised schedule. The Client bears the costs of any delays resulting from the breach of its cooperation duties.",
      "fields": [
        {
          "key": "client_cooperation",
          "label_de": "Vom Auftraggeber bereitzustellende Informationen/Unterlagen",
          "label_en": "Information/Documents to be Provided by Client",
          "type": "textarea",
          "required": false
        },
        {
          "key": "client_access",
          "label_de": "Zugang zu Ressourcen des Auftraggebers",
          "label_en": "Access to Client Resources",
          "type": "textarea",
          "required": false
        }
      ]
    },
    {
      "title_de": "Datenschutz und Vertraulichkeit",
      "title_en": "Data Protection and Confidentiality",
      "content_de": "Die Parteien verpflichten sich, die Bestimmungen der Datenschutz-Grundverordnung (DSGVO) sowie des Bundesdatenschutzgesetzes (BDSG) einzuhalten. Sofern der Auftragnehmer personenbezogene Daten im Auftrag des Auftraggebers verarbeitet, schließen die Parteien eine gesonderte Vereinbarung zur Auftragsverarbeitung gemäß Art. 28 DSGVO. Der Auftragnehmer verpflichtet sich, über alle ihm im Rahmen der Vertragsdurchführung bekannt werdenden vertraulichen Informationen und Geschäftsgeheimnisse des Auftraggebers auch über Vertragsbeendigung hinaus Stillschweignis zu bewahren. Vertrauliche Informationen umfassen alle technischen, kaufmännischen und betrieblichen Details, die nicht offenkundig sind. Die Vertraulichkeitsverpflichtung gilt für einen Zeitraum von {{confidentiality_years}} Jahren nach Vertragsbeendigung.",
      "content_en": "The parties undertake to comply with the provisions of the General Data Protection Regulation (GDPR) and the Federal Data Protection Act (BDSG). If the Contractor processes personal data on behalf of the Client, the parties shall conclude a separate data processing agreement pursuant to Art. 28 GDPR. The Contractor undertakes to maintain secrecy about all confidential information and trade secrets of the Client that become known during the performance of the contract, even after termination. Confidential information includes all technical, commercial and operational details that are not obvious. The confidentiality obligation applies for a period of {{confidentiality_years}} years after termination of the contract.",
      "fields": [
        {
          "key": "confidentiality_years",
          "label_de": "Vertraulichkeitsdauer nach Vertragsende (Jahre)",
          "label_en": "Confidentiality Period After Contract End (Years)",
          "type": "text",
          "required": false
        },
        {
          "key": "dpa_required",
          "label_de": "Auftragsverarbeitungsvereinbarung (AVV) erforderlich",
          "label_en": "Data Processing Agreement Required",
          "type": "select",
          "required": false,
          "options": [
            "ja, gesonderte AVV erforderlich",
            "nein, keine Personenbezug",
            "wird geprüft"
          ]
        }
      ]
    },
    {
      "title_de": "Haftung",
      "title_en": "Liability",
      "content_de": "Der Auftragnehmer haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für Schäden, die auf Vorsatz oder grober Fahrlässigkeit des Auftragnehmers, seiner gesetzlichen Vertreter oder leitenden Angestellten beruhen. Für leichte Fahrlässigkeit haftet der Auftragnehmer nur, soweit eine wesentliche Vertragspflicht (Kardinalpflicht) verletzt wird, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags erst ermöglicht und auf deren Einhaltung der Auftraggeber regelmäßig vertrauen darf. In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt, höchstens jedoch auf {{service_liability_cap}} EUR. Die Haftung für Sach- und Vermögensschäden ist auf {{service_liability_cap}} EUR begrenzt. Die vorstehenden Haftungsbeschränkungen gelten nicht für Ansprüche aus Produkthaftungsgesetz, aus arglistig verschwiegenen Mängeln oder aus der Übernahme einer Garantie.",
      "content_en": "The Contractor is liable without limitation for damages arising from injury to life, body or health, and for damages caused by intent or gross negligence of the Contractor, its legal representatives or senior employees. For slight negligence, the Contractor is liable only insofar as an essential contractual obligation (cardinal obligation) is breached, the fulfillment of which enables proper performance of the contract in the first place and on whose compliance the Client may regularly rely. In such case, liability is limited to the contract-typical, foreseeable damage, but no more than {{service_liability_cap}} EUR. Liability for property and financial losses is limited to {{service_liability_cap}} EUR. The foregoing limitations of liability do not apply to claims under the Product Liability Act, for fraudulently concealed defects, or arising from a guarantee.",
      "fields": [
        {
          "key": "service_liability_cap",
          "label_de": "Haftungsobergrenze (EUR)",
          "label_en": "Liability Cap (EUR)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Versicherung",
      "title_en": "Insurance",
      "content_de": "Der Auftragnehmer hat eine Berufshaftpflichtversicherung (Vermögensschadenhaftpflichtversicherung) mit einer Deckungssumme von {{professional_liability_coverage}} EUR abgeschlossen und während der Vertragsdauer aufrechtzuerhalten. Die Versicherung muss auch für Tätigkeiten im Ausland gelten, soweit diese vereinbart sind. Der Auftragnehmer weist die Versicherung auf Verlangen des Auftraggebers nach. Der Auftraggeber ist berechtigt, die Versicherungspolice beim Versicherer zur Prüfung einzusehen.",
      "content_en": "The Contractor has taken out professional liability insurance with coverage of {{professional_liability_coverage}} EUR and shall maintain it for the duration of the contract. The insurance must also cover activities abroad, to the extent agreed. The Contractor shall provide evidence of insurance at the Client's request. The Client is entitled to inspect the insurance policy at the insurer for verification.",
      "fields": [
        {
          "key": "professional_liability_coverage",
          "label_de": "Deckungssumme Berufshaftpflicht (EUR)",
          "label_en": "Professional Liability Coverage (EUR)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Laufzeit und Kündigung",
      "title_en": "Term and Termination",
      "content_de": "Der Vertrag beginnt am {{contract_start}} und endet am {{contract_end}}, sofern er nicht gemäß den nachfolgenden Bestimmungen früher endet. Die Kündigungsfrist für die ordentliche Kündigung beträgt {{notice_period_service}} Monate zum Ende des Kalendermonats. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund gemäß § 626 BGB bleibt unberührt. Ein wichtiger Grund liegt insbesondere vor, wenn eine Partei ihre wesentlichen Vertragspflichten trotz schriftlicher Abmahnung und Fristsetzung nicht erfüllt. Bei Kündigung durch den Auftraggeber hat der Auftragnehmer Anspruch auf anteilige Vergütung bis zum Wirksamwerden der Kündigung sowie auf Ersatz der bis dahin entstandenen Aufwendungen. Im Falle der Kündigung aus wichtigem Grund, den der Auftraggeber zu vertreten hat, steht dem Auftragnehmer die vereinbarte Vergütung für den gesamten Vertragszeitraum abzüglich ersparter Aufwendungen zu.",
      "content_en": "The contract commences on {{contract_start}} and ends on {{contract_end}}, unless it ends earlier in accordance with the following provisions. The notice period for ordinary termination is {{notice_period_service}} months to the end of the calendar month. The right to extraordinary termination for good cause pursuant to § 626 BGB remains unaffected. Good cause exists in particular if a party fails to fulfill its essential contractual obligations despite written warning and setting of a deadline. In the event of termination by the Client, the Contractor is entitled to a pro-rata fee until the termination takes effect, as well as reimbursement of expenses incurred up to that point. In the event of termination for good cause attributable to the Client, the Contractor is entitled to the agreed fee for the entire contract period less saved expenses.",
      "fields": [
        {
          "key": "contract_start",
          "label_de": "Vertragsbeginn",
          "label_en": "Contract Start",
          "type": "date",
          "required": false
        },
        {
          "key": "contract_end",
          "label_de": "Vertragsende",
          "label_en": "Contract End",
          "type": "date",
          "required": false
        },
        {
          "key": "notice_period_service",
          "label_de": "Ordentliche Kündigungsfrist (Monate)",
          "label_en": "Ordinary Notice Period (Months)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Abnahme und Mängel",
      "title_en": "Acceptance and Defects",
      "content_de": "Die Abnahme der erbrachten Leistungen erfolgt nach Erbringung der jeweiligen Leistungsstufe durch schriftliche Erklärung des Auftraggebers ({{acceptance_procedure}}). Der Auftraggeber hat erbrachte Leistungen unverzüglich zu prüfen und etwaige Mängel innerhalb von {{defect_notification_days}} Tagen schriftlich und detailliert zu rügen. Unterlässt der Auftraggeber die rechtzeitige Mängelrüge, gilt die Leistung als abgenommen. Der Auftragnehmer ist verpflichtet, berechtigte Mängel innerhalb angemessener Frist zu beseitigen. Der Anspruch auf Nacherfüllung verjährt innerhalb von {{warranty_period_service}} Monaten nach Abnahme.",
      "content_en": "Acceptance of the services rendered shall occur after completion of the respective service stage by written declaration of the Client ({{acceptance_procedure}}). The Client shall examine services immediately and report any defects in writing and in detail within {{defect_notification_days}} days. If the Client fails to give timely notice of defects, the service shall be deemed accepted. The Contractor is obligated to remedy justified defects within a reasonable period. The claim for subsequent performance becomes statute-barred within {{warranty_period_service}} months after acceptance.",
      "fields": [
        {
          "key": "acceptance_procedure",
          "label_de": "Abnahmeverfahren",
          "label_en": "Acceptance Procedure",
          "type": "select",
          "required": false,
          "options": [
            "schriftliche Abnahmeerklärung",
            "konkludent durch Ingebrauchnahme",
            "Abnahme durch Fristablauf (fiktive Abnahme)",
            "Einzelabnahme nach jedem Meilenstein"
          ]
        },
        {
          "key": "defect_notification_days",
          "label_de": "Mängelrügefrist (Tage)",
          "label_en": "Defect Notification Period (Days)",
          "type": "text",
          "required": false
        },
        {
          "key": "warranty_period_service",
          "label_de": "Gewährleistungsfrist (Monate)",
          "label_en": "Warranty Period (Months)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court_service}}. Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Anstelle der unwirksamen Bestimmung gilt eine wirksame Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung möglichst nahekommt. Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Schriftformklausel. Ausschließlicher Gerichtsstand für alle Streitigkeiten aus und im Zusammenhang mit diesem Vertrag ist, soweit gesetzlich zulässig, der Sitz des Auftraggebers. Ort: {{place_service}}, Datum: {{date_service}}.",
      "content_en": "Place of jurisdiction is {{court_service}}. The law of the Federal Republic of Germany applies, excluding the UN Convention on Contracts for the International Sale of Goods (CISG). Should any provision of this contract be or become invalid, the remainder of the contract shall remain effective. In place of the invalid provision, a valid provision shall apply that comes as close as possible to the economic purpose of the invalid provision. Amendments and supplements to this contract require written form; this also applies to the waiver of this written form clause. The exclusive place of jurisdiction for all disputes arising from and in connection with this contract is, to the extent legally permissible, the registered office of the Client. Place: {{place_service}}, Date: {{date_service}}.",
      "fields": [
        {
          "key": "court_service",
          "label_de": "Gerichtsstand",
          "label_en": "Place of Jurisdiction",
          "type": "text",
          "required": false
        },
        {
          "key": "place_service",
          "label_de": "Ort der Vertragsunterzeichnung",
          "label_en": "Place of Signing",
          "type": "text",
          "required": false
        },
        {
          "key": "date_service",
          "label_de": "Datum der Vertragsunterzeichnung",
          "label_en": "Date of Signing",
          "type": "date",
          "required": false
        }
      ]
    }
  ],
  "fileData": null,
  "fileName": null,
  "createdAt": "2026-05-31T00:00:00.000Z"
}
,
  {
  "id": 4,
  "category_id": 4,
  "title_de": "Standard-Darlehensvertrag",
  "title_en": "Standard Loan Agreement",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{lender_name}}, {{lender_address}} (im Folgenden \"Darlehensgeber\") und {{borrower_name}}, {{borrower_address}} (im Folgenden \"Darlehensnehmer\") wird folgender Darlehensvertrag gemäß §§ 488 ff. BGB geschlossen:",
      "content_en": "Between {{lender_name}}, {{lender_address}} (hereinafter \"Lender\") and {{borrower_name}}, {{borrower_address}} (hereinafter \"Borrower\") the following loan agreement is concluded pursuant to §§ 488 ff. BGB:",
      "fields": [
        {
          "key": "lender_name",
          "label_de": "Name des Darlehensgebers",
          "label_en": "Lender Name",
          "type": "text",
          "required": false
        },
        {
          "key": "lender_address",
          "label_de": "Anschrift des Darlehensgebers",
          "label_en": "Lender Address",
          "type": "text",
          "required": false
        },
        {
          "key": "borrower_name",
          "label_de": "Name des Darlehensnehmers",
          "label_en": "Borrower Name",
          "type": "text",
          "required": false
        },
        {
          "key": "borrower_address",
          "label_de": "Anschrift des Darlehensnehmers",
          "label_en": "Borrower Address",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Darlehenssumme und Auszahlung",
      "title_en": "Loan Amount and Disbursement",
      "content_de": "Der Darlehensgeber gewährt dem Darlehensnehmer ein Darlehen in Höhe von {{loan_amount}} EUR (in Worten: {{loan_amount_words}}). Die Auszahlung des Darlehens erfolgt am {{disbursement_date}} auf folgendes Konto des Darlehensnehmers: {{borrower_account}}. Voraussetzung für die Auszahlung ist das Vorliegen folgender Bedingungen (Auszahlungsvoraussetzungen): {{disbursement_conditions}}. Der Darlehensgeber ist berechtigt, die Auszahlung zu verweigern, wenn Umstände eintreten oder bekannt werden, die eine wesentliche Verschlechterung der Vermögensverhältnisse des Darlehensnehmers begründen oder auf eine solche schließen lassen.",
      "content_en": "The Lender grants the Borrower a loan in the amount of {{loan_amount}} EUR (in words: {{loan_amount_words}}). The loan shall be disbursed on {{disbursement_date}} to the following account of the Borrower: {{borrower_account}}. The disbursement is subject to the following conditions precedent: {{disbursement_conditions}}. The Lender is entitled to refuse disbursement if circumstances arise or become known that constitute or indicate a material deterioration of the Borrower's financial circumstances.",
      "fields": [
        {
          "key": "loan_amount",
          "label_de": "Darlehenssumme (EUR)",
          "label_en": "Loan Amount (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "loan_amount_words",
          "label_de": "Darlehenssumme in Worten",
          "label_en": "Loan Amount in Words",
          "type": "text",
          "required": false
        },
        {
          "key": "disbursement_date",
          "label_de": "Auszahlungstermin",
          "label_en": "Disbursement Date",
          "type": "date",
          "required": false
        },
        {
          "key": "borrower_account",
          "label_de": "Konto des Darlehensnehmers (IBAN)",
          "label_en": "Borrower's Account (IBAN)",
          "type": "text",
          "required": false
        },
        {
          "key": "disbursement_conditions",
          "label_de": "Auszahlungsvoraussetzungen",
          "label_en": "Disbursement Conditions",
          "type": "textarea",
          "required": false
        }
      ]
    },
    {
      "title_de": "Zinsen und Effektivzins",
      "title_en": "Interest and APR",
      "content_de": "Das Darlehen wird mit einem Nominalzinssatz in Höhe von {{interest_rate}}% p.a. verzinst. Der effektive Jahreszins beträgt {{effective_rate}}% p.a.; dieser entspricht dem Gesamtbetrag der Kosten als jährlicher Prozentsatz des Darlehensnennbetrags. Die Zinsberechnung erfolgt nach der Methode {{interest_calculation_method}}. Die Zinsen sind monatlich/vierteljährlich/jährlich nachträglich jeweils zum {{interest_payment_date}} fällig. Bei erstmaliger Fälligkeit der Zinsen sind die bis dahin aufgelaufenen Zinsen gesondert abzurechnen. Eine Zinsanpassung erfolgt gemäß der vertraglichen Zinsbindungsdauer: {{interest_fix_period}}. Nach Ablauf der Zinsbindungsdauer gelten die dann marktüblichen Zinssätze.",
      "content_en": "The loan bears interest at a nominal rate of {{interest_rate}}% p.a. The effective annual percentage rate (APR) is {{effective_rate}}% p.a.; this represents the total cost as an annual percentage of the loan amount. Interest is calculated according to the {{interest_calculation_method}} method. Interest is payable monthly/quarterly/annually in arrears on {{interest_payment_date}} each period. Upon the first due date of interest, the interest accrued up to that point shall be accounted for separately. Interest adjustment occurs according to the agreed interest rate fixation period: {{interest_fix_period}}. After expiry of the interest rate fixation period, the customary market interest rates shall apply.",
      "fields": [
        {
          "key": "interest_rate",
          "label_de": "Nominalzinssatz (% p.a.)",
          "label_en": "Nominal Interest Rate (% p.a.)",
          "type": "text",
          "required": false
        },
        {
          "key": "effective_rate",
          "label_de": "Effektiver Jahreszins (% p.a.)",
          "label_en": "Effective Annual Rate (% p.a.)",
          "type": "text",
          "required": false
        },
        {
          "key": "interest_calculation_method",
          "label_de": "Zinsberechnungsmethode",
          "label_en": "Interest Calculation Method",
          "type": "select",
          "required": false,
          "options": [
            "30/360 (deutsche Methode)",
            "act/360 (EU-Methode)",
            "act/365 (englische Methode)",
            "act/act (tagesgenau)"
          ]
        },
        {
          "key": "interest_payment_date",
          "label_de": "Zinszahlungstag",
          "label_en": "Interest Payment Date",
          "type": "text",
          "required": false
        },
        {
          "key": "interest_fix_period",
          "label_de": "Zinsbindungsdauer",
          "label_en": "Interest Rate Fixation Period",
          "type": "select",
          "required": false,
          "options": [
            "1 Jahr",
            "3 Jahre",
            "5 Jahre",
            "10 Jahre",
            "15 Jahre",
            "variabel (marktabhängig)"
          ]
        }
      ]
    },
    {
      "title_de": "Rückzahlung",
      "title_en": "Repayment",
      "content_de": "Das Darlehen ist in {{installments}} monatlichen Raten zurückzuzahlen. Die Höhe der monatlichen Rate beträgt {{installment_amount}} EUR, bestehend aus einem Tilgungsanteil von {{repayment_portion}} EUR und einem Zinsanteil von {{interest_portion}} EUR (anfänglich). Die erste Rate ist am {{first_payment_date}} fällig, die letzte Rate am {{last_payment_date}}. Der Darlehensnehmer ist berechtigt, das Darlehen ganz oder teilweise vorzeitig zurückzuzahlen ({{early_repayment_right}}). Bei vorzeitiger Rückzahlung hat der Darlehensgeber Anspruch auf eine Vorfälligkeitsentschädigung nach Maßgabe des § 502 BGB. Der Darlehensnehmer kann das Darlehen nach § 489 BGB unter Einhaltung einer Kündigungsfrist von sechs Monaten ganz oder teilweise kündigen, wenn die Zinsbindungsdauer abgelaufen ist. Ein Tilgungsplan (Amortisationsplan) ist als Anlage beigefügt.",
      "content_en": "The loan shall be repaid in {{installments}} monthly installments. The monthly installment amounts to {{installment_amount}} EUR, consisting of a repayment portion of {{repayment_portion}} EUR and an interest portion of {{interest_portion}} EUR (initial). The first installment is due on {{first_payment_date}}, the last installment on {{last_payment_date}}. The Borrower is entitled to repay the loan in whole or in part before the agreed date ({{early_repayment_right}}). In the event of early repayment, the Lender is entitled to an early repayment penalty in accordance with § 502 BGB. The Borrower may terminate the loan in whole or in part pursuant to § 489 BGB with six months' notice if the interest rate fixation period has expired. An amortization schedule is attached as an appendix.",
      "fields": [
        {
          "key": "installments",
          "label_de": "Anzahl der Raten",
          "label_en": "Number of Installments",
          "type": "text",
          "required": false
        },
        {
          "key": "installment_amount",
          "label_de": "Monatliche Rate (EUR)",
          "label_en": "Monthly Installment (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "repayment_portion",
          "label_de": "Tilgungsanteil anfänglich (EUR)",
          "label_en": "Initial Repayment Portion (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "interest_portion",
          "label_de": "Zinsanteil anfänglich (EUR)",
          "label_en": "Initial Interest Portion (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "first_payment_date",
          "label_de": "Erste Rate fällig am",
          "label_en": "First Installment Due On",
          "type": "date",
          "required": false
        },
        {
          "key": "last_payment_date",
          "label_de": "Letzte Rate fällig am",
          "label_en": "Last Installment Due On",
          "type": "date",
          "required": false
        },
        {
          "key": "early_repayment_right",
          "label_de": "Vorzeitiges Rückzahlungsrecht",
          "label_en": "Early Repayment Right",
          "type": "select",
          "required": false,
          "options": [
            "jederzeit ohne Kosten",
            "jederzeit mit Vorfälligkeitsentschädigung (§ 502 BGB)",
            "nach Ablauf der Zinsbindung (§ 489 BGB)",
            "nicht vorgesehen"
          ]
        }
      ]
    },
    {
      "title_de": "Sicherheiten",
      "title_en": "Collateral",
      "content_de": "Zur Sicherung aller bestehenden und künftigen Forderungen des Darlehensgebers aus diesem Darlehensvertrag werden folgende Sicherheiten bestellt: {{collateral_description}}. Die Sicherheiten sind {{collateral_valuation}}. Der Darlehensnehmer verpflichtet sich, die Sicherheiten instand zu halten und ausreichend zu versichern. Auf Verlangen des Darlehensgebers ist der Versicherungsnachweis zu erbringen. Der Darlehensnehmer verpflichtet sich, die Sicherheiten nicht mit Rechten Dritter zu belasten und nicht zu veräußern. Bei Veräußerung oder wesentlicher Verschlechterung der Sicherheiten ist der Darlehensnehmer verpflichtet, dem Darlehensgeber auf Verlangen gleichwertige Ersatzsicherheiten zu bestellen.",
      "content_en": "To secure all existing and future claims of the Lender arising from this loan agreement, the following collateral is provided: {{collateral_description}}. The collateral is valued at {{collateral_valuation}}. The Borrower undertakes to maintain the collateral in good condition and to insure it adequately. Proof of insurance shall be provided at the Lender's request. The Borrower undertakes not to encumber the collateral with third-party rights and not to dispose of it. In the event of disposal or material deterioration of the collateral, the Borrower is obligated to provide equivalent replacement collateral at the Lender's request.",
      "fields": [
        {
          "key": "collateral_description",
          "label_de": "Beschreibung der Sicherheiten",
          "label_en": "Description of Collateral",
          "type": "textarea",
          "required": false
        },
        {
          "key": "collateral_valuation",
          "label_de": "Bewertung der Sicherheiten (EUR)",
          "label_en": "Collateral Valuation (EUR)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Verzug und Kündigung",
      "title_en": "Default and Termination",
      "content_de": "Der Darlehensnehmer befindet sich in Verzug, wenn er eine fällige Zahlung nicht innerhalb von {{grace_period_days}} Tagen nach Fälligkeit leistet. Der Verzugszinssatz beträgt {{default_interest_rate}} Prozentpunkte über dem Basiszinssatz gemäß § 288 BGB. Der Darlehensgeber ist berechtigt, das Darlehen gemäß § 498 BGB zu kündigen, wenn der Darlehensnehmer mit mindestens zwei aufeinanderfolgenden Teilzahlungen ganz oder teilweise in Verzug ist und die Rückstände mindestens {{default_percent}}% des Darlehennennbetrags betragen. Der Darlehensgeber ist ferner zur außerordentlichen Kündigung aus wichtigem Grund berechtigt, insbesondere bei wesentlicher Verschlechterung der Vermögensverhältnisse des Darlehensnehmers, bei falschen Angaben des Darlehensnehmers oder bei Verletzung der Sicherungsabrede. Der Darlehensnehmer ist berechtigt, den Darlehensvertrag gemäß § 489 BGB unter Einhaltung der gesetzlichen Fristen zu kündigen, sofern die Zinsbindung abgelaufen ist.",
      "content_en": "The Borrower is in default if a due payment is not made within {{grace_period_days}} days after the due date. The default interest rate is {{default_interest_rate}} percentage points above the base rate pursuant to § 288 BGB. The Lender is entitled to terminate the loan pursuant to § 498 BGB if the Borrower is in default with at least two consecutive partial payments in whole or in part and the arrears amount to at least {{default_percent}}% of the nominal loan amount. The Lender is further entitled to extraordinary termination for good cause, in particular in the event of a material deterioration of the Borrower's financial circumstances, false statements by the Borrower, or breach of the security agreement. The Borrower is entitled to terminate the loan agreement pursuant to § 489 BGB in compliance with the statutory periods insofar as the interest rate fixation period has expired.",
      "fields": [
        {
          "key": "grace_period_days",
          "label_de": "Nachfrist vor Verzug (Tage)",
          "label_en": "Grace Period Before Default (Days)",
          "type": "text",
          "required": false
        },
        {
          "key": "default_interest_rate",
          "label_de": "Verzugszinssatz (Prozentpunkte über Basiszinssatz)",
          "label_en": "Default Interest Rate (Percentage Points Above Base Rate)",
          "type": "text",
          "required": false
        },
        {
          "key": "default_percent",
          "label_de": "Mindestrückstand für Kündigung (% des Nennbetrags)",
          "label_en": "Minimum Arrears for Termination (% of Principal)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Zweckbindung",
      "title_en": "Purpose Limitation",
      "content_de": "Das Darlehen wird zu folgendem Zweck gewährt: {{loan_purpose}}. Der Darlehensnehmer verpflichtet sich, die Darlehensvaluta ausschließlich für den genannten Zweck zu verwenden. Eine zweckwidrige Verwendung berechtigt den Darlehensgeber zur außerordentlichen Kündigung des Darlehensvertrags. Der Darlehensgeber ist berechtigt, die zweckentsprechende Verwendung der Darlehensmittel durch Vorlage entsprechender Nachweise (Rechnungen, Zahlungsbelege) zu überprüfen.",
      "content_en": "The loan is granted for the following purpose: {{loan_purpose}}. The Borrower undertakes to use the loan proceeds exclusively for the stated purpose. Use contrary to the purpose entitles the Lender to extraordinary termination of the loan agreement. The Lender is entitled to verify the use of the loan proceeds in accordance with the purpose by requesting appropriate evidence (invoices, payment receipts).",
      "fields": [
        {
          "key": "loan_purpose",
          "label_de": "Verwendungszweck des Darlehens",
          "label_en": "Purpose of the Loan",
          "type": "textarea",
          "required": false
        }
      ]
    },
    {
      "title_de": "Informationspflichten",
      "title_en": "Information Obligations",
      "content_de": "Der Darlehensnehmer ist verpflichtet, dem Darlehensgeber auf Verlangen jederzeit Auskunft über seine wirtschaftlichen Verhältnisse zu erteilen, insbesondere durch Vorlage von Jahresabschlüssen, betriebswirtschaftlichen Auswertungen, Steuerbescheiden und Vermögensübersichten: {{financial_info_provision}}. Der Darlehensnehmer hat dem Darlehensgeber unverzüglich alle Umstände mitzuteilen, die für die Beurteilung der Kreditwürdigkeit von Bedeutung sein können, insbesondere den Eintritt von Vermögensverfall, die Stellung von Insolvenzanträgen, wesentliche Verluste, den Wegfall von Sicherheiten oder die Änderung der rechtlichen Verhältnisse des Darlehensnehmers. Bei Verletzung der Informationspflichten ist der Darlehensgeber zur außerordentlichen Kündigung des Darlehens berechtigt.",
      "content_en": "The Borrower is obligated to provide the Lender with information on its financial circumstances at any time upon request, in particular by submitting annual financial statements, management reports, tax assessments and asset overviews: {{financial_info_provision}}. The Borrower shall immediately notify the Lender of all circumstances that may be relevant for the assessment of creditworthiness, in particular the onset of financial decline, filing for insolvency, material losses, loss of collateral, or changes in the Borrower's legal circumstances. In the event of breach of information obligations, the Lender is entitled to extraordinary termination of the loan.",
      "fields": [
        {
          "key": "financial_info_provision",
          "label_de": "Vorlage von Finanzinformationen",
          "label_en": "Provision of Financial Information",
          "type": "select",
          "required": false,
          "options": [
            "jährliche Vorlage des Jahresabschlusses",
            "vierteljährliche BWA und Liquiditätsplan",
            "auf Anforderung",
            "nicht vereinbart"
          ]
        }
      ]
    },
    {
      "title_de": "Vorfälligkeitsentschädigung",
      "title_en": "Early Repayment Penalty",
      "content_de": "Bei vorzeitiger Rückzahlung des Darlehens ist der Darlehensgeber berechtigt, eine Vorfälligkeitsentschädigung zu verlangen, die nach der Aktiv-Passiv-Methode oder der vereinbarten Berechnungsmethode zu ermitteln ist: {{prepayment_penalty_method}}. Die Berechnung erfolgt gemäß § 502 BGB. Der Darlehensgeber wird dem Darlehensnehmer auf Verlangen eine detaillierte Berechnung der Vorfälligkeitsentschädigung vorlegen. Die Vorfälligkeitsentschädigung ist begrenzt auf {{prepayment_penalty_max}}% des vorzeitig zurückgezahlten Darlehensbetrags. Bei einer Kündigung nach § 489 BGB (Kündigung nach Zinsbindungsende) wird keine Vorfälligkeitsentschädigung fällig.",
      "content_en": "In the event of early repayment of the loan, the Lender is entitled to demand an early repayment penalty, to be determined according to the asset-liability method or the agreed calculation method: {{prepayment_penalty_method}}. The calculation is made in accordance with § 502 BGB. The Lender shall provide the Borrower with a detailed calculation of the early repayment penalty upon request. The early repayment penalty is limited to {{prepayment_penalty_max}}% of the early repaid loan amount. In the event of termination pursuant to § 489 BGB (termination after expiry of the interest rate fixation period), no early repayment penalty is due.",
      "fields": [
        {
          "key": "prepayment_penalty_method",
          "label_de": "Berechnungsmethode Vorfälligkeitsentschädigung",
          "label_en": "Early Repayment Penalty Calculation Method",
          "type": "select",
          "required": false,
          "options": [
            "Aktiv-Passiv-Methode",
            "Kapitalwertmethode",
            "Richtsatzmethode der BVI",
            "nach individueller Vereinbarung"
          ]
        },
        {
          "key": "prepayment_penalty_max",
          "label_de": "Maximale Vorfälligkeitsentschädigung (% des Betrags)",
          "label_en": "Maximum Early Repayment Penalty (% of Amount)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Versicherung",
      "title_en": "Insurance",
      "content_de": "Der Darlehensnehmer hat auf eigenen Wunsch folgende Versicherungen abgeschlossen oder wird diese abschließen: {{loan_insurances}}. Eine Restschuldversicherung (Darlehensausfallversicherung) besteht: {{residual_debt_insurance}}. Im Falle des Versicherungsfalls (Arbeitsunfähigkeit, Arbeitslosigkeit, Tod) tritt die Versicherung für die ausstehenden Darlehensraten ein, soweit die Versicherungsbedingungen dies vorsehen. Der Darlehensnehmer verpflichtet sich, die Versicherungsbeiträge regelmäßig zu zahlen und den Versicherungsschutz während der gesamten Darlehenslaufzeit aufrechtzuerhalten. Der Darlehensgeber ist berechtigt, den Versicherungsschein und die Zahlungsnachweise anzufordern.",
      "content_en": "The Borrower has taken out or will take out the following insurances at its own request: {{loan_insurances}}. Residual debt insurance (loan default insurance) exists: {{residual_debt_insurance}}. In the event of an insured event (incapacity for work, unemployment, death), the insurance covers the outstanding loan installments to the extent provided by the insurance terms and conditions. The Borrower undertakes to pay the insurance premiums regularly and to maintain insurance coverage for the entire term of the loan. The Lender is entitled to request the insurance policy and proof of payment.",
      "fields": [
        {
          "key": "loan_insurances",
          "label_de": "Vereinbarte Versicherungen",
          "label_en": "Agreed Insurances",
          "type": "textarea",
          "required": false
        },
        {
          "key": "residual_debt_insurance",
          "label_de": "Restschuldversicherung",
          "label_en": "Residual Debt Insurance",
          "type": "select",
          "required": false,
          "options": [
            "ja, abgeschlossen",
            "nein, nicht gewünscht",
            "wird noch geprüft"
          ]
        }
      ]
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court_loan}}. Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, wird der Vertrag im Übrigen nicht berührt. Anstelle der unwirksamen Bestimmung gilt eine dem wirtschaftlich Gewollten möglichst nahekommende Regelung. Sämtliche Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Abänderung dieser Schriftformklausel. Ausschließlicher Gerichtsstand für Streitigkeiten aus diesem Vertrag ist, soweit gesetzlich zulässig, der Sitz des Darlehensgebers. Ort: {{place_loan}}, Datum: {{date_loan}}.",
      "content_en": "Place of jurisdiction is {{court_loan}}. The law of the Federal Republic of Germany applies. Should any provision of this contract be or become invalid, the remainder of the contract shall not be affected. In place of the invalid provision, a provision shall apply that comes as close as possible to the economic intent. All amendments and supplements to this contract require written form; this also applies to the amendment of this written form clause. The exclusive place of jurisdiction for disputes arising from this contract is, to the extent legally permissible, the registered office of the Lender. Place: {{place_loan}}, Date: {{date_loan}}.",
      "fields": [
        {
          "key": "court_loan",
          "label_de": "Gerichtsstand",
          "label_en": "Place of Jurisdiction",
          "type": "text",
          "required": false
        },
        {
          "key": "place_loan",
          "label_de": "Ort der Vertragsunterzeichnung",
          "label_en": "Place of Signing",
          "type": "text",
          "required": false
        },
        {
          "key": "date_loan",
          "label_de": "Datum der Vertragsunterzeichnung",
          "label_en": "Date of Signing",
          "type": "date",
          "required": false
        }
      ]
    }
  ],
  "fileData": null,
  "fileName": null,
  "createdAt": "2026-05-31T00:00:00.000Z"
}
,
  {
  "id": 5,
  "category_id": 5,
  "title_de": "Vertraulichkeitsvereinbarung (NDA)",
  "title_en": "Non-Disclosure Agreement (NDA)",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{disclosing_name}}, {{disclosing_address}} (im Folgenden \"Offenlegende Partei\") und {{receiving_name}}, {{receiving_address}} (im Folgenden \"Empfangende Partei\") wird folgende Vertraulichkeitsvereinbarung (Non-Disclosure Agreement) geschlossen:",
      "content_en": "Between {{disclosing_name}}, {{disclosing_address}} (hereinafter \"Disclosing Party\") and {{receiving_name}}, {{receiving_address}} (hereinafter \"Receiving Party\") the following non-disclosure agreement is concluded:",
      "fields": [
        {
          "key": "disclosing_name",
          "label_de": "Name der offenlegenden Partei",
          "label_en": "Disclosing Party Name",
          "type": "text",
          "required": false
        },
        {
          "key": "disclosing_address",
          "label_de": "Adresse der offenlegenden Partei",
          "label_en": "Disclosing Party Address",
          "type": "text",
          "required": false
        },
        {
          "key": "receiving_name",
          "label_de": "Name der empfangenden Partei",
          "label_en": "Receiving Party Name",
          "type": "text",
          "required": false
        },
        {
          "key": "receiving_address",
          "label_de": "Adresse der empfangenden Partei",
          "label_en": "Receiving Party Address",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Zweck der Offenlegung",
      "title_en": "Purpose of Disclosure",
      "content_de": "Die Offenlegung vertraulicher Informationen erfolgt im Rahmen der Prüfung und Vorbereitung einer möglichen Geschäftsbeziehung oder Transaktion im Zusammenhang mit folgendem Projekt: {{nda_project_description}}. Die vertraulichen Informationen dürfen von der empfangenden Partei ausschließlich für diesen Zweck verwendet werden (Zweckbindung). Eine darüber hinausgehende Nutzung ist nicht gestattet.",
      "content_en": "The disclosure of confidential information takes place in the context of evaluating and preparing a potential business relationship or transaction in connection with the following project: {{nda_project_description}}. The confidential information may be used by the Receiving Party exclusively for this purpose (purpose limitation). Use beyond this purpose is not permitted.",
      "fields": [
        {
          "key": "nda_project_description",
          "label_de": "Projektbeschreibung / Zweck der Offenlegung",
          "label_en": "Project Description / Purpose of Disclosure",
          "type": "textarea",
          "required": false
        }
      ]
    },
    {
      "title_de": "Vertrauliche Informationen",
      "title_en": "Confidential Information",
      "content_de": "Vertrauliche Informationen im Sinne dieser Vereinbarung sind sämtliche Informationen, die der offenlegenden Partei gehören oder von ihr kontrolliert werden, unabhängig von der Form der Offenlegung (schriftlich, mündlich, elektronisch, visuell oder auf sonstigem Wege). Dazu gehören insbesondere: (a) Geschäfts- und Handelsgeheimnisse, (b) technische Daten, Spezifikationen, Erfindungen, Patente, Know-how, (c) Finanzinformationen, Bilanzen, Geschäftspläne, (d) Kunden- und Lieferantenlisten, (e) Strategien, Marketingpläne, Marktanalysen, (f) Informationen über Mitarbeiter, Organisationsstruktur und interne Abläufe, (g) Software, Quellcode, Datenbanken und Algorithmen. Der konkrete Umfang der vertraulichen Informationen ist: {{confidential_scope}}. Informationen gelten auch dann als vertraulich, wenn sie nicht ausdrücklich als solche gekennzeichnet sind, sich aber aus den Umständen der Offenlegung oder der Art der Information ihre Vertraulichkeit ergibt.",
      "content_en": "Confidential information within the meaning of this agreement includes all information owned or controlled by the Disclosing Party, regardless of the form of disclosure (written, oral, electronic, visual or otherwise). This includes in particular: (a) business and trade secrets, (b) technical data, specifications, inventions, patents, know-how, (c) financial information, balance sheets, business plans, (d) customer and supplier lists, (e) strategies, marketing plans, market analyses, (f) information about employees, organizational structure and internal processes, (g) software, source code, databases and algorithms. The specific scope of confidential information is: {{confidential_scope}}. Information is deemed confidential even if it is not expressly marked as such, if its confidentiality arises from the circumstances of disclosure or the nature of the information.",
      "fields": [
        {
          "key": "confidential_scope",
          "label_de": "Umfang der vertraulichen Informationen",
          "label_en": "Scope of Confidential Information",
          "type": "textarea",
          "required": false
        }
      ]
    },
    {
      "title_de": "Pflichten des Empfängers",
      "title_en": "Obligations of the Receiving Party",
      "content_de": "Die empfangende Partei verpflichtet sich: (1) Die vertraulichen Informationen geheim zu halten und Dritten nicht zugänglich zu machen. (2) Die vertraulichen Informationen ausschließlich für den vereinbarten Zweck zu verwenden. (3) Den Zugang zu vertraulichen Informationen auf diejenigen Mitarbeiter, Berater und Beauftragten zu beschränken, die diese Informationen zur Erfüllung des Zwecks zwingend benötigen (Need-to-Know-Prinzip). (4) Die vorgenannten Personen zur Vertraulichkeit zu verpflichten und für deren Einhaltung wie für eigenes Verschulden einzustehen. (5) Die vertraulichen Informationen nicht zu kopieren, zu reproduzieren oder zu vervielfältigen, es sei denn, dies ist für den Zweck erforderlich. (6) Angemessene technische und organisatorische Maßnahmen (TOM) zum Schutz der vertraulichen Informationen zu treffen. (7) Die vertraulichen Informationen nicht zu dekompilieren, zu reverse-engineeren oder zu disassemblieren.",
      "content_en": "The Receiving Party undertakes: (1) To keep the confidential information secret and not to make it accessible to third parties. (2) To use the confidential information exclusively for the agreed purpose. (3) To restrict access to confidential information to those employees, consultants and agents who need this information for the fulfillment of the purpose (need-to-know principle). (4) To obligate the aforementioned persons to confidentiality and to answer for their compliance as for its own fault. (5) Not to copy, reproduce or duplicate the confidential information unless necessary for the purpose. (6) To implement appropriate technical and organizational measures (TOM) to protect the confidential information. (7) Not to decompile, reverse-engineer or disassemble the confidential information.",
      "fields": []
    },
    {
      "title_de": "Ausnahmen von der Vertraulichkeit",
      "title_en": "Exceptions to Confidentiality",
      "content_de": "Die Pflichten der empfangenden Partei gelten nicht für Informationen, die: (a) zum Zeitpunkt der Offenlegung bereits öffentlich bekannt sind oder danach ohne Verstoß gegen diese Vereinbarung öffentlich bekannt werden; (b) der empfangenden Partei vor der Offenlegung durch die offenlegende Partei nachweislich bereits bekannt waren; (c) von einem Dritten ohne Verletzung einer Vertraulichkeitsverpflichtung rechtmäßig erlangt wurden; (d) von der empfangenden Partei unabhängig entwickelt wurden, ohne Rückgriff auf vertrauliche Informationen (Nachweis durch schriftliche Aufzeichnungen); (e) aufgrund einer gesetzlichen Verpflichtung, einer gerichtlichen oder behördlichen Anordnung offengelegt werden müssen. Im Fall des Buchstaben (e) wird die empfangende Partei die offenlegende Partei unverzüglich vor der Offenlegung informieren, soweit rechtlich zulässig, und den Umfang der Offenlegung auf das rechtlich erforderliche Mindestmaß beschränken.",
      "content_en": "The obligations of the Receiving Party shall not apply to information that: (a) is publicly known at the time of disclosure or subsequently becomes publicly known without breach of this agreement; (b) was demonstrably known to the Receiving Party prior to disclosure by the Disclosing Party; (c) was lawfully obtained from a third party without breach of a confidentiality obligation; (d) was independently developed by the Receiving Party without recourse to confidential information (as evidenced by written records); (e) must be disclosed due to a legal obligation, court order or regulatory directive. In the case of (e), the Receiving Party shall promptly inform the Disclosing Party prior to disclosure, to the extent legally permissible, and shall limit the scope of disclosure to the legally required minimum.",
      "fields": []
    },
    {
      "title_de": "Dauer der Geheimhaltung",
      "title_en": "Duration of Confidentiality",
      "content_de": "Die Verpflichtung der empfangenden Partei zur Geheimhaltung der vertraulichen Informationen gilt für einen Zeitraum von {{nda_term}} Jahren ab dem Datum der Offenlegung der jeweiligen vertraulichen Information. Nach Ablauf dieser Frist ist die empfangende Partei von ihren Geheimhaltungsverpflichtungen befreit, soweit gesetzlich zulässig. Die Verpflichtung zur vertraulichen Behandlung von Geschäftsgeheimnissen im Sinne des Geschäftsgeheimnisgesetzes (GeschGehG) besteht jedoch ohne zeitliche Begrenzung fort, solange die Informationen die Voraussetzungen eines Geschäftsgeheimnisses erfüllen.",
      "content_en": "The Receiving Party's obligation to maintain the confidentiality of the confidential information applies for a period of {{nda_term}} years from the date of disclosure of the respective confidential information. After expiry of this period, the Receiving Party is released from its confidentiality obligations, to the extent legally permitted. However, the obligation to maintain the confidentiality of trade secrets within the meaning of the Trade Secrets Act (GeschGehG) continues without temporal limitation as long as the information meets the requirements of a trade secret.",
      "fields": [
        {
          "key": "nda_term",
          "label_de": "Geheimhaltungsdauer (Jahre)",
          "label_en": "Confidentiality Period (Years)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Rückgabe und Löschung",
      "title_en": "Return and Deletion",
      "content_de": "Die empfangende Partei ist verpflichtet, der offenlegenden Partei auf deren Verlangen oder bei Beendigung des zugrunde liegenden Projekts (spätestens jedoch innerhalb von {{return_days}} Tagen nach Aufforderung) alle vertraulichen Informationen in verkörperter Form (einschließlich sämtlicher Kopien, Auszüge, Zusammenfassungen, Analysen und Notizen) unverzüglich herauszugeben oder zu vernichten. Digitale Dateien und Datenbankinhalte sind vollständig und unwiederbringlich zu löschen. Die empfangende Partei bestätigt der offenlegenden Partei auf Verlangen schriftlich die vollständige Rückgabe und Löschung. Die empfangende Partei ist berechtigt, eine Kopie aufzubewahren, soweit dies zur Erfüllung gesetzlicher Aufbewahrungspflichten erforderlich ist; diese Kopie unterliegt weiterhin der Vertraulichkeit.",
      "content_en": "The Receiving Party is obligated, at the Disclosing Party's request or upon termination of the underlying project (but in any event within {{return_days}} days of request), to immediately return or destroy all confidential information in tangible form (including all copies, extracts, summaries, analyses and notes). Digital files and database contents shall be completely and irrevocably deleted. The Receiving Party shall confirm in writing to the Disclosing Party upon request the complete return and deletion. The Receiving Party is entitled to retain one copy insofar as this is necessary to fulfill statutory retention obligations; this copy shall remain subject to confidentiality.",
      "fields": [
        {
          "key": "return_days",
          "label_de": "Frist für Rückgabe/Löschung (Tage)",
          "label_en": "Period for Return/Deletion (Days)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Vertragsstrafe",
      "title_en": "Contractual Penalty",
      "content_de": "Die empfangende Partei zahlt der offenlegenden Partei für jeden nachweislichen Verstoß gegen die Verpflichtungen aus dieser Vereinbarung eine Vertragsstrafe in Höhe von {{nda_penalty}} EUR ({{nda_penalty_currency}}). Bei fortdauernden Verstößen gilt jeder Tag der Zuwiderhandlung als eigener Verstoß. Die Vertragsstrafe ist auf maximal {{nda_penalty_max}} EUR begrenzt. Die Geltendmachung weitergehender Schadensersatzansprüche bleibt ausdrücklich vorbehalten; die Vertragsstrafe wird auf einen etwaigen Schadensersatzanspruch angerechnet. Die Vertragsstrafe ist unverzüglich nach erstmaliger Aufforderung durch die offenlegende Partei fällig.",
      "content_en": "The Receiving Party shall pay to the Disclosing Party for each proven breach of the obligations under this agreement a contractual penalty of {{nda_penalty}} EUR ({{nda_penalty_currency}}). In the case of continuing violations, each day of infringement shall constitute a separate breach. The contractual penalty is limited to a maximum of {{nda_penalty_max}} EUR. The assertion of further claims for damages remains expressly reserved; the contractual penalty shall be credited against any claim for damages. The contractual penalty shall be due immediately upon first demand by the Disclosing Party.",
      "fields": [
        {
          "key": "nda_penalty",
          "label_de": "Vertragsstrafe pro Verstoß (EUR)",
          "label_en": "Contractual Penalty per Violation (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "nda_penalty_currency",
          "label_de": "Währung der Vertragsstrafe",
          "label_en": "Currency of Penalty",
          "type": "select",
          "required": false,
          "options": [
            "EUR",
            "USD",
            "CHF"
          ]
        },
        {
          "key": "nda_penalty_max",
          "label_de": "Maximale Vertragsstrafe insgesamt (EUR)",
          "label_en": "Maximum Total Penalty (EUR)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Rechtsfolgen bei Verstoß",
      "title_en": "Legal Consequences of Breach",
      "content_de": "Bei einem Verstoß gegen die Vertraulichkeitsverpflichtungen ist die offenlegende Partei berechtigt, (a) Unterlassung gemäß § 1004 BGB analog zu verlangen, (b) einstweiligen Rechtsschutz ohne Darlegung besonderer Dringlichkeit zu beantragen, (c) Schadensersatz nach den gesetzlichen Bestimmungen zu fordern, (d) die Vertragsstrafe nach Maßgabe der vorstehenden Ziffer geltend zu machen. Die Verletzung von Geschäftsgeheimnissen kann nach dem Geschäftsgeheimnisgesetz (GeschGehG) und strafrechtlich nach § 23 GeschGehG verfolgt werden. Die offenlegende Partei behält sich das Recht vor, die sofortige Unterlassung der Nutzung und die Herausgabe aller vertraulichen Informationen zu verlangen. Die Geltendmachung von Ansprüchen aus dieser Vereinbarung steht Ansprüchen aus anderen Rechtsgrundlagen (insbesondere unerlaubte Handlung, Eigentumsverletzung) nicht entgegen.",
      "content_en": "In the event of a breach of the confidentiality obligations, the Disclosing Party is entitled to (a) demand injunctive relief pursuant to § 1004 BGB analog, (b) apply for interim legal protection without demonstrating special urgency, (c) claim damages in accordance with statutory provisions, (d) assert the contractual penalty in accordance with the preceding clause. The violation of trade secrets may be prosecuted under the Trade Secrets Act (GeschGehG) and as a criminal offense under § 23 GeschGehG. The Disclosing Party reserves the right to demand immediate cessation of use and the return of all confidential information. The assertion of claims under this agreement does not preclude claims under other legal bases (in particular tort, infringement of property rights).",
      "fields": []
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court_nda}}. Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine Bestimmung dieser Vereinbarung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam. Anstelle der unwirksamen Bestimmung gilt eine angemessene Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung möglichst nahekommt. Änderungen und Ergänzungen dieser Vereinbarung bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Schriftformklausel. Diese Vereinbarung begründet kein Vertragsverhältnis, kein Joint Venture, keine Partnerschaft oder kein sonstiges Gesellschaftsverhältnis zwischen den Parteien. Ansprüche aus dieser Vereinbarung verjähren innerhalb der gesetzlichen Verjährungsfrist, längstens jedoch innerhalb von drei Jahren ab dem Zeitpunkt, in dem die offenlegende Partei Kenntnis von den anspruchsbegründenden Umständen erlangt hat oder ohne grobe Fahrlässigkeit erlangt haben müsste. Ort: {{place_nda}}, Datum: {{date_nda}}.",
      "content_en": "Place of jurisdiction is {{court_nda}}. The law of the Federal Republic of Germany applies. Should any provision of this agreement be or become invalid, the remainder of the agreement shall remain effective. In place of the invalid provision, a reasonable provision shall apply that comes as close as possible to the economic purpose of the invalid provision. Amendments and supplements to this agreement require written form; this also applies to the waiver of this written form clause. This agreement does not create a contractual relationship, joint venture, partnership or other corporate relationship between the parties. Claims under this agreement become statute-barred within the statutory limitation period, but no later than three years from the time the Disclosing Party obtained knowledge of the circumstances giving rise to the claim or should have obtained such knowledge without gross negligence. Place: {{place_nda}}, Date: {{date_nda}}.",
      "fields": [
        {
          "key": "court_nda",
          "label_de": "Gerichtsstand",
          "label_en": "Place of Jurisdiction",
          "type": "text",
          "required": false
        },
        {
          "key": "place_nda",
          "label_de": "Ort der Vertragsunterzeichnung",
          "label_en": "Place of Signing",
          "type": "text",
          "required": false
        },
        {
          "key": "date_nda",
          "label_de": "Datum der Vertragsunterzeichnung",
          "label_en": "Date of Signing",
          "type": "date",
          "required": false
        }
      ]
    }
  ],
  "fileData": null,
  "fileName": null,
  "createdAt": "2026-05-31T00:00:00.000Z"
}
,
  {
  "id": 6,
  "category_id": 6,
  "title_de": "Standard-Arbeitsvertrag",
  "title_en": "Standard Employment Contract",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{employer_name}}, {{employer_address}} (im Folgenden \"Arbeitgeber\") und {{employee_name}}, {{employee_address}} (im Folgenden \"Arbeitnehmer\") wird folgender Arbeitsvertrag gemäß §§ 611a ff. BGB geschlossen:",
      "content_en": "Between {{employer_name}}, {{employer_address}} (hereinafter \"Employer\") and {{employee_name}}, {{employee_address}} (hereinafter \"Employee\") the following employment contract is concluded pursuant to §§ 611a ff. BGB:",
      "fields": [
        {
          "key": "employer_name",
          "label_de": "Name des Arbeitgebers",
          "label_en": "Employer Name",
          "type": "text",
          "required": false
        },
        {
          "key": "employer_address",
          "label_de": "Adresse des Arbeitgebers",
          "label_en": "Employer Address",
          "type": "text",
          "required": false
        },
        {
          "key": "employee_name",
          "label_de": "Name des Arbeitnehmers",
          "label_en": "Employee Name",
          "type": "text",
          "required": false
        },
        {
          "key": "employee_address",
          "label_de": "Adresse des Arbeitnehmers",
          "label_en": "Employee Address",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Tätigkeit und Position",
      "title_en": "Position and Duties",
      "content_de": "Der Arbeitnehmer wird als {{position}} eingestellt. Die Tätigkeit umfasst im Wesentlichen die folgenden Aufgaben: {{job_description}}. Der Arbeitnehmer ist dem {{reporting_line}} (Vorgesetzter/Abteilung) zugeordnet. Der Arbeitgeber ist berechtigt, dem Arbeitnehmer eine andere zumutbare Tätigkeit zuzuweisen, die seinen Fähigkeiten und seiner Qualifikation entspricht (Direktionsrecht gemäß § 106 GewO). Eine Änderungskündigung bleibt vorbehalten. Der Arbeitnehmer hat die ihm übertragenen Aufgaben gewissenhaft und ordnungsgemäß zu erfüllen und die berechtigten Weisungen des Arbeitgebers zu befolgen.",
      "content_en": "The Employee is employed as {{position}}. The duties essentially comprise the following tasks: {{job_description}}. The Employee reports to {{reporting_line}} (supervisor/department). The Employer is entitled to assign the Employee other reasonable activities that correspond to the Employee's abilities and qualifications (right of direction pursuant to § 106 GewO). A change termination remains reserved. The Employee shall perform the assigned tasks conscientiously and properly and follow the legitimate instructions of the Employer.",
      "fields": [
        {
          "key": "position",
          "label_de": "Position / Berufsbezeichnung",
          "label_en": "Position / Job Title",
          "type": "text",
          "required": false
        },
        {
          "key": "job_description",
          "label_de": "Tätigkeitsbeschreibung",
          "label_en": "Job Description",
          "type": "textarea",
          "required": false
        },
        {
          "key": "reporting_line",
          "label_de": "Vorgesetzter / Abteilung",
          "label_en": "Reporting Line / Department",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Arbeitsort",
      "title_en": "Place of Work",
      "content_de": "Der Arbeitsort ist {{work_location}}. Der Arbeitnehmer wird an diesem Ort hauptsächlich tätig. Homeoffice/Telesarbeit ist {{home_office_policy}}. Der Arbeitgeber behält sich das Recht vor, den Arbeitnehmer vorübergehend an einem anderen Ort im Inland oder Ausland einzusetzen, sofern dem Arbeitnehmer dies zumutbar ist. Dienstreisen sind entsprechend der Tätigkeit erforderlich: {{travel_requirements}}. Bei Auslandseinsätzen von mehr als {{abroad_days}} Tagen werden die Bedingungen in einer gesonderten Vereinbarung geregelt.",
      "content_en": "The place of work is {{work_location}}. The Employee shall primarily work at this location. Home office/telework is {{home_office_policy}}. The Employer reserves the right to temporarily assign the Employee to a different location domestically or abroad, insofar as this is reasonable for the Employee. Business travel is required in accordance with the position: {{travel_requirements}}. For assignments abroad exceeding {{abroad_days}} days, the conditions shall be regulated in a separate agreement.",
      "fields": [
        {
          "key": "work_location",
          "label_de": "Arbeitsort",
          "label_en": "Work Location",
          "type": "text",
          "required": false
        },
        {
          "key": "home_office_policy",
          "label_de": "Homeoffice-Regelung",
          "label_en": "Home Office Policy",
          "type": "select",
          "required": false,
          "options": [
            "nicht vorgesehen",
            "nach Absprache möglich",
            "regelmäßig 1-2 Tage pro Woche",
            "vollständig remote"
          ]
        },
        {
          "key": "travel_requirements",
          "label_de": "Reisetätigkeit",
          "label_en": "Travel Requirements",
          "type": "select",
          "required": false,
          "options": [
            "keine Reisetätigkeit",
            "gelegentlich (bis 10%)",
            "häufig (10-30%)",
            "intensiv (über 30%)"
          ]
        },
        {
          "key": "abroad_days",
          "label_de": "Auslandseinsatz ab (Tagen)",
          "label_en": "Abroad Assignment From (Days)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Arbeitszeit",
      "title_en": "Working Hours",
      "content_de": "Die regelmäßige wöchentliche Arbeitszeit beträgt {{weekly_hours}} Stunden. Die Verteilung der Arbeitszeit erfolgt gemäß {{working_time_model}}. Es gilt eine gleitende Arbeitszeit (Vertrauensarbeitszeit): {{flexitime}}. Die gesetzlichen Ruhepausen gemäß § 4 ArbZG betragen bei einer Arbeitszeit von mehr als sechs Stunden 30 Minuten und von mehr als neun Stunden 45 Minuten. Pausenzeiten werden nicht vergütet. Überstunden sind {{overtime_regulation}}. Die tägliche Höchstarbeitszeit beträgt gemäß § 3 ArbZG acht Stunden, kann aber auf zehn Stunden verlängert werden, sofern innerhalb von sechs Kalendermonaten im Durchschnitt acht Stunden werktäglich nicht überschritten werden. Sonn- und Feiertagsarbeit richtet sich nach den gesetzlichen Bestimmungen (§§ 9 ff. ArbZG).",
      "content_en": "The regular weekly working hours amount to {{weekly_hours}} hours. The distribution of working hours follows {{working_time_model}}. Flexitime applies: {{flexitime}}. The statutory break times pursuant to § 4 ArbZG are 30 minutes for working hours exceeding six hours and 45 minutes for working hours exceeding nine hours. Break times are not remunerated. Overtime is {{overtime_regulation}}. The maximum daily working time pursuant to § 3 ArbZG is eight hours, but may be extended to ten hours provided that an average of eight hours per working day is not exceeded within six calendar months. Sunday and public holiday work is governed by statutory provisions (§§ 9 ff. ArbZG).",
      "fields": [
        {
          "key": "weekly_hours",
          "label_de": "Wöchentliche Arbeitszeit (Stunden)",
          "label_en": "Weekly Working Hours",
          "type": "text",
          "required": false
        },
        {
          "key": "working_time_model",
          "label_de": "Arbeitszeitmodell",
          "label_en": "Working Time Model",
          "type": "select",
          "required": false,
          "options": [
            "Festarbeitszeit (8:00-17:00)",
            "Gleitzeit mit Kernzeit",
            "Schichtarbeit",
            "Teilzeit mit fester Verteilung",
            "Vertrauensarbeitszeit"
          ]
        },
        {
          "key": "flexitime",
          "label_de": "Gleitzeitvereinbarung",
          "label_en": "Flexitime Agreement",
          "type": "select",
          "required": false,
          "options": [
            "ja, Kernzeit 9:00-15:00",
            "ja, Kernzeit 10:00-14:00",
            "nein, feste Arbeitszeit",
            "Vertrauensarbeitszeit ohne Zeiterfassung"
          ]
        },
        {
          "key": "overtime_regulation",
          "label_de": "Überstundenregelung",
          "label_en": "Overtime Regulation",
          "type": "select",
          "required": false,
          "options": [
            "mit Gehalt abgegolten",
            "werden vergütet (25% Zuschlag)",
            "werden durch Freizeit ausgeglichen",
            "nur bei Anordnung"
          ]
        }
      ]
    },
    {
      "title_de": "Vergütung",
      "title_en": "Remuneration",
      "content_de": "Der Arbeitnehmer erhält ein monatliches Bruttogehalt in Höhe von {{gross_salary}} EUR. Die Zahlung erfolgt monatlich am {{salary_payment_day}}. Werktag des Folgemonats auf das vom Arbeitnehmer benannte Konto. Zusätzlich kann der Arbeitgeber einen Bonus/13. Monatsgehalt gewähren: {{bonus_13th}}. Der Arbeitgeber prüft jährlich eine leistungsgerechte Vergütungsanpassung ({{salary_review}}). Sonstige Vergütungsbestandteile: {{additional_compensation}}.",
      "content_en": "The Employee receives a monthly gross salary of {{gross_salary}} EUR. Payment is made monthly by the {{salary_payment_day}}th working day of the following month to the account designated by the Employee. Additionally, the Employer may grant a bonus/13th month salary: {{bonus_13th}}. The Employer reviews annually for a performance-based salary adjustment ({{salary_review}}). Other compensation components: {{additional_compensation}}.",
      "fields": [
        {
          "key": "gross_salary",
          "label_de": "Bruttomonatsgehalt (EUR)",
          "label_en": "Gross Monthly Salary (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "salary_payment_day",
          "label_de": "Zahlungstag (Werktag des Folgemonats)",
          "label_en": "Payment Day (Working Day of Following Month)",
          "type": "select",
          "required": false,
          "options": [
            "1.",
            "3.",
            "5.",
            "letzter"
          ]
        },
        {
          "key": "bonus_13th",
          "label_de": "Bonus / 13. Monatsgehalt",
          "label_en": "Bonus / 13th Month Salary",
          "type": "select",
          "required": false,
          "options": [
            "kein 13. Gehalt",
            "13. Monatsgehalt (November)",
            "Weihnachtsgeld (freiwillig)",
            "Leistungsbonus (variabel)"
          ]
        },
        {
          "key": "salary_review",
          "label_de": "Gehaltsanpassung",
          "label_en": "Salary Review",
          "type": "select",
          "required": false,
          "options": [
            "jährliche Überprüfung",
            "keine feste Regelung",
            "nach Betriebszugehörigkeit"
          ]
        },
        {
          "key": "additional_compensation",
          "label_de": "Sonstige Vergütungsbestandteile",
          "label_en": "Additional Compensation Components",
          "type": "textarea",
          "required": false
        }
      ]
    },
    {
      "title_de": "Sozialleistungen und Versicherungen",
      "title_en": "Benefits and Insurance",
      "content_de": "Der Arbeitnehmer unterliegt der gesetzlichen Sozialversicherungspflicht, soweit nicht die Voraussetzungen für eine private Krankenversicherung vorliegen ({{health_insurance_type}}). Die Beiträge zur gesetzlichen Rentenversicherung (GRV), Arbeitslosenversicherung, Krankenversicherung und Pflegeversicherung werden je zur Hälfte von Arbeitgeber und Arbeitnehmer getragen, soweit gesetzlich nicht anders bestimmt. Der Arbeitgeber bietet eine betriebliche Altersvorsorge (bAV) an: {{company_pension}}. Eine Unfallversicherung besteht über die Berufsgenossenschaft (gesetzliche Unfallversicherung). Vermögenswirksame Leistungen (VWL) werden gewährt: {{capital_forming_benefits}}. Sonstige Sozialleistungen: {{additional_benefits}}.",
      "content_en": "The Employee is subject to statutory social insurance, unless the conditions for private health insurance are met ({{health_insurance_type}}). Contributions to the statutory pension insurance (GRV), unemployment insurance, health insurance and long-term care insurance are borne equally by the Employer and Employee, unless otherwise provided by law. The Employer offers a company pension (bAV): {{company_pension}}. Accident insurance is provided through the employers' liability insurance association (statutory accident insurance). Capital-forming benefits (VWL) are granted: {{capital_forming_benefits}}. Other social benefits: {{additional_benefits}}.",
      "fields": [
        {
          "key": "health_insurance_type",
          "label_de": "Krankenversicherungsart",
          "label_en": "Health Insurance Type",
          "type": "select",
          "required": false,
          "options": [
            "gesetzlich pflichtversichert",
            "freiwillig gesetzlich versichert",
            "privat krankenversichert"
          ]
        },
        {
          "key": "company_pension",
          "label_de": "Betriebliche Altersvorsorge (bAV)",
          "label_en": "Company Pension (bAV)",
          "type": "select",
          "required": false,
          "options": [
            "ja, mit Arbeitgeberzuschuss",
            "ja, über Entgeltumwandlung",
            "nein"
          ]
        },
        {
          "key": "capital_forming_benefits",
          "label_de": "Vermögenswirksame Leistungen (VWL)",
          "label_en": "Capital-Forming Benefits (VWL)",
          "type": "select",
          "required": false,
          "options": [
            "ja, 40 EUR/Monat",
            "ja, 26,59 EUR/Monat (Sparzulage)",
            "nein"
          ]
        },
        {
          "key": "additional_benefits",
          "label_de": "Sonstige Sozialleistungen",
          "label_en": "Additional Social Benefits",
          "type": "textarea",
          "required": false
        }
      ]
    },
    {
      "title_de": "Urlaub",
      "title_en": "Vacation",
      "content_de": "Der Arbeitnehmer hat Anspruch auf {{vacation_days}} Werktage Erholungsurlaub pro Kalenderjahr (§ 3 BUrlG). Der gesetzliche Mindesturlaub beträgt 24 Werktage bei einer 6-Tage-Woche bzw. 20 Arbeitstage bei einer 5-Tage-Woche. Der Urlaub ist im laufenden Kalenderjahr zu nehmen und kann gemäß § 7 Abs. 3 BUrlG auf das folgende Kalenderjahr übertragen werden, muss jedoch bis zum 31. März des Folgejahres angetreten werden. Bei Eintritt oder Austritt im laufenden Kalenderjahr erfolgt eine anteilige Berechnung (§ 5 BUrlG). Der Arbeitnehmer hat Anspruch auf bezahlte Freistellung für besondere Anlässe (Sonderurlaub): {{special_leave}}. Unbezahlter Urlaub (Sabbatical) ist {{unpaid_leave}}.",
      "content_en": "The Employee is entitled to {{vacation_days}} working days of paid vacation per calendar year (§ 3 BUrlG). The statutory minimum vacation is 24 working days for a 6-day week or 20 working days for a 5-day week. Vacation must be taken in the current calendar year and may be carried over to the following calendar year pursuant to § 7 para. 3 BUrlG, but must be taken by March 31 of the following year. Upon commencement or termination during the calendar year, a pro-rata calculation is made (§ 5 BUrlG). The Employee is entitled to paid leave for special occasions (special leave): {{special_leave}}. Unpaid leave (sabbatical) is {{unpaid_leave}}.",
      "fields": [
        {
          "key": "vacation_days",
          "label_de": "Urlaubstage pro Kalenderjahr",
          "label_en": "Vacation Days per Calendar Year",
          "type": "text",
          "required": false
        },
        {
          "key": "special_leave",
          "label_de": "Sonderurlaub (Anlässe und Tage)",
          "label_en": "Special Leave (Occasions and Days)",
          "type": "textarea",
          "required": false
        },
        {
          "key": "unpaid_leave",
          "label_de": "Unbezahlter Urlaub / Sabbatical",
          "label_en": "Unpaid Leave / Sabbatical",
          "type": "select",
          "required": false,
          "options": [
            "nicht vorgesehen",
            "nach Absprache möglich",
            "im Rahmen eines Sabbatical-Modells"
          ]
        }
      ]
    },
    {
      "title_de": "Arbeitsverhinderung und Krankheit",
      "title_en": "Incapacity and Sickness",
      "content_de": "Der Arbeitnehmer ist verpflichtet, jede Arbeitsunfähigkeit infolge Krankheit sowie deren voraussichtliche Dauer unverzüglich, spätestens bis {{notification_deadline}} Uhr am ersten Krankheitstag, dem Arbeitgeber anzuzeigen (§ 5 EFZG). Dauert die Arbeitsunfähigkeit länger als drei Kalendertage, hat der Arbeitnehmer eine ärztliche Bescheinigung über das Bestehen der Arbeitsunfähigkeit (AU) spätestens am darauffolgenden Arbeitstag vorzulegen (§ 5 Abs. 1 Satz 2 EFZG). Der Arbeitgeber ist berechtigt, die Vorlage der AU bereits ab dem ersten Krankheitstag zu verlangen. Der Arbeitnehmer behält für die Dauer von sechs Wochen den Anspruch auf Fortzahlung des Arbeitsentgelts gemäß § 3 EFZG. Nach Ablauf der sechs Wochen besteht Anspruch auf Krankengeld von der gesetzlichen Krankenkasse. Bei Wiederholungserkrankungen gelten die Regelungen des § 3 Abs. 1 Satz 2 EFZG.",
      "content_en": "The Employee is obligated to report any incapacity for work due to illness and its expected duration to the Employer immediately, but no later than {{notification_deadline}} o'clock on the first day of illness (§ 5 EFZG). If the incapacity lasts longer than three calendar days, the Employee must submit a medical certificate of incapacity for work (AU) no later than the following working day (§ 5 para. 1 sentence 2 EFZG). The Employer is entitled to request submission of the AU from the first day of illness. The Employee retains the right to continued payment of remuneration for a period of six weeks pursuant to § 3 EFZG. After expiry of the six weeks, the Employee is entitled to sickness benefit from the statutory health insurance fund. In the case of recurring illnesses, the provisions of § 3 para. 1 sentence 2 EFZG apply.",
      "fields": [
        {
          "key": "notification_deadline",
          "label_de": "Meldefrist bei Krankheit (Uhrzeit)",
          "label_en": "Notification Deadline for Illness (Time)",
          "type": "select",
          "required": false,
          "options": [
            "9:00 Uhr",
            "10:00 Uhr",
            "12:00 Uhr",
            "unverzüglich"
          ]
        },
        {
          "key": "au_from_first_day",
          "label_de": "AU ab erstem Tag erforderlich",
          "label_en": "Medical Certificate from First Day Required",
          "type": "select",
          "required": false,
          "options": [
            "ja",
            "nein (erst ab 3. Tag)"
          ]
        }
      ]
    },
    {
      "title_de": "Vertragsdauer und Kündigung",
      "title_en": "Contract Duration and Termination",
      "content_de": "Das Arbeitsverhältnis beginnt am {{employment_start_date}}. Es handelt sich um ein {{contract_duration_type}} Arbeitsverhältnis. Die Probezeit beträgt {{probation_period}} Monate (§ 622 Abs. 3 BGB). Während der Probezeit beträgt die Kündigungsfrist zwei Wochen (§ 622 Abs. 3 BGB). Nach Ablauf der Probezeit beträgt die Kündigungsfrist {{notice_period_emp}} Monate zum Monatsende (§ 622 BGB). Für den Arbeitgeber verlängern sich die Kündigungsfristen gemäß § 622 Abs. 2 BGB nach einer Betriebszugehörigkeit von zwei Jahren auf einen Monat, von fünf Jahren auf zwei Monate, von acht Jahren auf drei Monate, von zehn Jahren auf vier Monate, von zwölf Jahren auf fünf Monate, von fünfzehn Jahren auf sechs Monate, von zwanzig Jahren auf sieben Monate. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund gemäß § 626 BGB bleibt unberührt. Die Kündigung bedarf der Schriftform (§ 623 BGB). Bei einer Befristung beträgt die Vertragsdauer {{fixed_term_period}} (§ 14 TzBfG).",
      "content_en": "The employment relationship commences on {{employment_start_date}}. This is a {{contract_duration_type}} employment relationship. The probationary period is {{probation_period}} months (§ 622 para. 3 BGB). During the probationary period, the notice period is two weeks (§ 622 para. 3 BGB). After expiry of the probationary period, the notice period is {{notice_period_emp}} months to the end of the month (§ 622 BGB). For the Employer, the notice periods are extended pursuant to § 622 para. 2 BGB after two years of service to one month, after five years to two months, after eight years to three months, after ten years to four months, after twelve years to five months, after fifteen years to six months, after twenty years to seven months. The right to extraordinary termination for good cause pursuant to § 626 BGB remains unaffected. Termination requires written form (§ 623 BGB). In the case of a fixed-term contract, the contract duration is {{fixed_term_period}} (§ 14 TzBfG).",
      "fields": [
        {
          "key": "employment_start_date",
          "label_de": "Arbeitsbeginn",
          "label_en": "Employment Start Date",
          "type": "date",
          "required": false
        },
        {
          "key": "contract_duration_type",
          "label_de": "Vertragsart",
          "label_en": "Contract Type",
          "type": "select",
          "required": false,
          "options": [
            "unbefristet",
            "befristet (sachgrundlos bis 2 Jahre)",
            "befristet (mit Sachgrund)",
            "Teilzeit"
          ]
        },
        {
          "key": "probation_period",
          "label_de": "Probezeit (Monate)",
          "label_en": "Probation Period (Months)",
          "type": "select",
          "required": false,
          "options": [
            "1",
            "3",
            "6"
          ]
        },
        {
          "key": "notice_period_emp",
          "label_de": "Kündigungsfrist nach Probezeit (Monate)",
          "label_en": "Notice Period After Probation (Months)",
          "type": "select",
          "required": false,
          "options": [
            "1",
            "2",
            "3",
            "4",
            "6"
          ]
        },
        {
          "key": "fixed_term_period",
          "label_de": "Befristungsdauer",
          "label_en": "Fixed Term Duration",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Verschwiegenheit und Wettbewerb",
      "title_en": "Confidentiality and Non-Competition",
      "content_de": "Der Arbeitnehmer ist verpflichtet, über alle Geschäfts- und Betriebsgeheimnisse des Arbeitgebers sowie über alle ihm im Rahmen seiner Tätigkeit bekannt gewordenen vertraulichen Angelegenheiten und Abläufe des Arbeitgebers auch nach Beendigung des Arbeitsverhältnisses Stillschweigen zu bewahren (Geheimhaltungspflicht). Die Geheimhaltungspflicht erstreckt sich auch auf Kenntnisse über Kunden, Lieferanten, Umsätze, Gewinne, Kalkulationen, Entwicklungen, Forschungsarbeiten, Produktionsverfahren, EDV-Programme und Organisationsabläufe. Eine Nebentätigkeit außerhalb des Arbeitsverhältnisses bedarf der vorherigen schriftlichen Zustimmung des Arbeitgebers (§ 60 HGB). Der Arbeitgeber kann die Zustimmung versagen, wenn die Nebentätigkeit die Arbeitsleistung beeinträchtigt oder mit den Interessen des Arbeitgebers kollidiert. Ein nachvertragliches Wettbewerbsverbot ist {{non_compete}}. Für die Dauer des Wettbewerbsverbots erhält der Arbeitnehmer eine Karenzentschädigung in Höhe von {{non_compete_compensation}}% des zuletzt bezogenen Bruttogehalts (§ 74 HGB).",
      "content_en": "The Employee is obligated to maintain secrecy regarding all business and trade secrets of the Employer as well as all confidential matters and processes of the Employer that become known in the course of the Employee's activities, even after termination of the employment relationship (duty of secrecy). The duty of confidentiality extends to information about customers, suppliers, sales, profits, calculations, developments, research, production methods, IT programs and organizational processes. Secondary employment outside the employment relationship requires prior written consent of the Employer (§ 60 HGB). The Employer may refuse consent if the secondary employment impairs work performance or conflicts with the interests of the Employer. A post-contractual non-compete clause is {{non_compete}}. For the duration of the non-compete obligation, the Employee receives a compensation of {{non_compete_compensation}}% of the last gross salary (§ 74 HGB).",
      "fields": [
        {
          "key": "non_compete",
          "label_de": "Nachvertragliches Wettbewerbsverbot",
          "label_en": "Post-Contractual Non-Compete",
          "type": "select",
          "required": false,
          "options": [
            "nein",
            "ja, 6 Monate",
            "ja, 12 Monate",
            "ja, 24 Monate"
          ]
        },
        {
          "key": "non_compete_compensation",
          "label_de": "Karenzentschädigung (% des letzten Bruttogehalts)",
          "label_en": "Non-Compete Compensation (% of Last Gross Salary)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Datenschutz",
      "title_en": "Data Protection",
      "content_de": "Der Arbeitnehmer ist verpflichtet, die Bestimmungen der Datenschutz-Grundverordnung (DSGVO), des Bundesdatenschutzgesetzes (BDSG) sowie der sonstigen anwendbaren datenschutzrechtlichen Vorschriften einzuhalten. Der Arbeitnehmer darf personenbezogene Daten, die ihm im Rahmen seiner Tätigkeit bekannt werden, nur im Rahmen seiner Aufgaben und gemäß den Weisungen des Arbeitgebers verarbeiten. Der Arbeitnehmer hat die Grundsätze der Datenverarbeitung (Art. 5 DSGVO) zu beachten, insbesondere Datenminimierung, Richtigkeit, Speicherbegrenzung und Integrität. Der Arbeitnehmer ist verpflichtet, die vom Arbeitgeber bereitgestellten technischen und organisatorischen Maßnahmen (TOM) zum Schutz personenbezogener Daten zu beachten. Verstöße gegen den Datenschutz sind dem Arbeitgeber unverzüglich zu melden. Die Verarbeitung personenbezogener Daten des Arbeitnehmers (Personalakte, Entgeltabrechnung) erfolgt auf der Grundlage von Art. 6 Abs. 1 lit. b DSGVO i.V.m. §§ 26 BDSG. Der Arbeitnehmer hat das Recht auf Auskunft gemäß Art. 15 DSGVO über die zu seiner Person gespeicherten Daten.",
      "content_en": "The Employee is obligated to comply with the provisions of the General Data Protection Regulation (GDPR), the Federal Data Protection Act (BDSG) and other applicable data protection regulations. The Employee may process personal data that becomes known in the course of the Employee's activities only within the scope of the Employee's duties and in accordance with the Employer's instructions. The Employee shall observe the principles of data processing (Art. 5 GDPR), in particular data minimization, accuracy, storage limitation and integrity. The Employee is obligated to observe the technical and organizational measures (TOM) provided by the Employer for the protection of personal data. Violations of data protection must be reported to the Employer immediately. The processing of the Employee's personal data (personnel file, payroll) is carried out on the basis of Art. 6 para. 1 lit. b GDPR in conjunction with §§ 26 BDSG. The Employee has the right of access pursuant to Art. 15 GDPR to data stored about the Employee's person.",
      "fields": []
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court_emp}}. Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Anstelle der unwirksamen Bestimmung gilt eine wirksame Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung möglichst nahekommt. Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Schriftformklausel. Nebenabreden bestehen nicht. Etwaige Ansprüche aus dem Arbeitsverhältnis verfallen, wenn sie nicht innerhalb eines Ausschlussfrist von {{exclusion_period}} Monaten nach Fälligkeit schriftlich geltend gemacht werden. Dieser Vertrag wurde in zwei Ausfertigungen erstellt. Ort: {{place_emp}}, Datum: {{date_emp}}.",
      "content_en": "Place of jurisdiction is {{court_emp}}. The law of the Federal Republic of Germany applies. Should any provision of this contract be or become invalid, the remainder of the contract shall remain effective. In place of the invalid provision, a valid provision shall apply that comes as close as possible to the economic purpose of the invalid provision. Amendments and supplements to this contract require written form; this also applies to the waiver of this written form clause. There are no ancillary agreements. Any claims arising from the employment relationship shall lapse if not asserted in writing within {{exclusion_period}} months after due date. This contract has been executed in two copies. Place: {{place_emp}}, Date: {{date_emp}}.",
      "fields": [
        {
          "key": "court_emp",
          "label_de": "Gerichtsstand",
          "label_en": "Place of Jurisdiction",
          "type": "text",
          "required": false
        },
        {
          "key": "exclusion_period",
          "label_de": "Ausschlussfrist (Monate)",
          "label_en": "Exclusion Period (Months)",
          "type": "text",
          "required": false
        },
        {
          "key": "place_emp",
          "label_de": "Ort der Vertragsunterzeichnung",
          "label_en": "Place of Signing",
          "type": "text",
          "required": false
        },
        {
          "key": "date_emp",
          "label_de": "Datum der Vertragsunterzeichnung",
          "label_en": "Date of Signing",
          "type": "date",
          "required": false
        }
      ]
    }
  ],
  "fileData": null,
  "fileName": null,
  "createdAt": "2026-05-31T00:00:00.000Z"
}
,
  {
  "id": 7,
  "category_id": 7,
  "title_de": "Auftrag / Geschäftsbesorgungsvertrag",
  "title_en": "Agency / Mandate Agreement",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{principal_name}}, {{principal_address}} (im Folgenden \"Auftraggeber\") und {{agent_name}}, {{agent_address}} (im Folgenden \"Beauftragter\") wird folgender Auftrag gemäß §§ 662 ff. BGB bzw. Geschäftsbesorgungsvertrag gemäß § 675 BGB geschlossen:",
      "content_en": "Between {{principal_name}}, {{principal_address}} (hereinafter \"Principal\") and {{agent_name}}, {{agent_address}} (hereinafter \"Agent\") the following mandate agreement is concluded pursuant to §§ 662 ff. BGB or agency agreement pursuant to § 675 BGB:",
      "fields": [
        {
          "key": "principal_name",
          "label_de": "Name des Auftraggebers",
          "label_en": "Principal Name",
          "type": "text",
          "required": false
        },
        {
          "key": "principal_address",
          "label_de": "Adresse des Auftraggebers",
          "label_en": "Principal Address",
          "type": "text",
          "required": false
        },
        {
          "key": "agent_name",
          "label_de": "Name des Beauftragten",
          "label_en": "Agent Name",
          "type": "text",
          "required": false
        },
        {
          "key": "agent_address",
          "label_de": "Adresse des Beauftragten",
          "label_en": "Agent Address",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Auftrag und Geschäftsbesorgung",
      "title_en": "Mandate and Business Management",
      "content_de": "Der Auftraggeber beauftragt den Beauftragten mit der Besorgung folgender Angelegenheit: {{mandate_description}}. Der Beauftragte übernimmt die Durchführung des Auftrags im eigenen Namen oder im Namen des Auftraggebers ({{mandate_type}}). Der Beauftragte handelt dabei nach den Grundsätzen der eigenverantwortlichen Erledigung. Die Tätigkeit umfasst insbesondere: {{mandate_details}}. Der Beauftragte ist berechtigt, zur Durchführung des Auftrags Hilfspersonen und Subunternehmer einzusetzen, sofern nichts anderes vereinbart ist.",
      "content_en": "The Principal instructs the Agent to handle the following matter: {{mandate_description}}. The Agent undertakes the execution of the mandate in its own name or in the name of the Principal ({{mandate_type}}). The Agent acts according to the principles of independent execution. The activity includes in particular: {{mandate_details}}. The Agent is entitled to use assistants and subcontractors for the execution of the mandate, unless otherwise agreed.",
      "fields": [
        {
          "key": "mandate_description",
          "label_de": "Beschreibung des Auftrags",
          "label_en": "Description of the Mandate",
          "type": "textarea",
          "required": false
        },
        {
          "key": "mandate_type",
          "label_de": "Art des Auftrags",
          "label_en": "Type of Mandate",
          "type": "select",
          "required": false,
          "options": [
            "offene Stellvertretung (im Namen des AG)",
            "verdeckte Stellvertretung (im eigenen Namen)",
            "Eigenbesorgung mit Vollmacht",
            "Geschäftsbesorgung (§ 675 BGB)"
          ]
        },
        {
          "key": "mandate_details",
          "label_de": "Detaillierte Aufgabenbeschreibung",
          "label_en": "Detailed Task Description",
          "type": "textarea",
          "required": false
        }
      ]
    },
    {
      "title_de": "Weisungsrecht",
      "title_en": "Right of Instruction",
      "content_de": "Der Auftraggeber ist berechtigt, dem Beauftragten jederzeit Weisungen hinsichtlich der Durchführung des Auftrags zu erteilen. Der Beauftragte ist gemäß § 665 BGB berechtigt, von den Weisungen des Auftraggebers abzuweichen, wenn er den Umständen nach annehmen darf, dass der Auftraggeber bei Kenntnis der Sachlage die Abweichung billigen würde. Vor einer Abweichung von Weisungen hat der Beauftragte dem Auftraggeber die beabsichtigte Abweichung mitzuteilen und dessen Entscheidung abzuwarten, sofern nicht Gefahr im Verzug ist. Der Beauftragte hat bei Zweifeln über den Umfang des Auftrags oder über die Auslegung von Weisungen unverzüglich eine Klarstellung des Auftraggebers einzuholen.",
      "content_en": "The Principal is entitled to give instructions to the Agent at any time regarding the execution of the mandate. Pursuant to § 665 BGB, the Agent is entitled to deviate from the Principal's instructions if the Agent may assume, under the circumstances, that the Principal would approve the deviation if aware of the facts. Before deviating from instructions, the Agent shall inform the Principal of the intended deviation and await the Principal's decision, unless there is imminent danger. If the Agent has doubts about the scope of the mandate or the interpretation of instructions, the Agent shall promptly seek clarification from the Principal.",
      "fields": [
        {
          "key": "instruction_form",
          "label_de": "Form der Weisungserteilung",
          "label_en": "Form of Instruction",
          "type": "select",
          "required": false,
          "options": [
            "schriftlich oder elektronisch",
            "mündlich, schriftlich oder elektronisch",
            "ausschließlich schriftlich"
          ]
        }
      ]
    },
    {
      "title_de": "Pflichten des Beauftragten",
      "title_en": "Agent's Duties",
      "content_de": "Der Beauftragte hat den Auftrag mit der Sorgfalt eines ordentlichen Kaufmanns auszuführen. Der Beauftragte ist zur persönlichen Leistungserbringung verpflichtet, soweit nichts anderes vereinbart ist (§ 664 BGB). Der Beauftragte hat dem Auftraggeber gemäß § 666 BGB die erforderlichen Nachrichten zu geben, auf Verlangen über den Stand der Angelegenheit Auskunft zu erteilen und nach der Ausführung des Auftrags Rechenschaft abzulegen. Die Berichterstattung erfolgt {{reporting_frequency}}. Der Beauftragte hat Interessenkonflikte zu vermeiden und bestehende oder potenzielle Interessenkonflikte dem Auftraggeber unverzüglich offenzulegen. Der Beauftragte darf keine Geschenke, Provisionen oder sonstige Vorteile von Dritten annehmen, die im Zusammenhang mit dem Auftrag stehen, es sei denn, der Auftraggeber hat eingewilligt.",
      "content_en": "The Agent shall execute the mandate with the diligence of a prudent merchant. The Agent is obligated to perform services personally, unless otherwise agreed (§ 664 BGB). Pursuant to § 666 BGB, the Agent shall provide the Principal with necessary information, report on the status of the matter upon request, and render an account after execution of the mandate. Reporting shall occur {{reporting_frequency}}. The Agent shall avoid conflicts of interest and shall immediately disclose any existing or potential conflicts of interest to the Principal. The Agent shall not accept gifts, commissions or other advantages from third parties in connection with the mandate unless the Principal has consented.",
      "fields": [
        {
          "key": "reporting_frequency",
          "label_de": "Berichtspflicht / Berichtsintervall",
          "label_en": "Reporting Frequency",
          "type": "select",
          "required": false,
          "options": [
            "monatlich",
            "vierteljährlich",
            "nach Meilensteinen",
            "auf Anforderung des Auftraggebers"
          ]
        }
      ]
    },
    {
      "title_de": "Vergütung und Aufwendungsersatz",
      "title_en": "Remuneration and Expenses",
      "content_de": "Der Beauftragte erhält für seine Tätigkeit eine Vergütung in Höhe von {{mandate_fee}} EUR (netto zzgl. gesetzlicher Umsatzsteuer). Die Vergütung ist fällig {{fee_due_date}}. Sofern die Tätigkeit üblicherweise nur gegen Vergütung zu erwarten ist, gilt gemäß § 612 BGB eine Vergütung als stillschweigend vereinbart. Der Auftraggeber ist gemäß § 670 BGB verpflichtet, dem Beauftragten die zum Zwecke der Ausführung des Auftrags gemachten Aufwendungen zu ersetzen, soweit sie der Beauftragte den Umständen nach für erforderlich halten durfte. Aufwendungen umfassen insbesondere: {{reimbursable_expenses}}. Der Beauftragte ist berechtigt, einen angemessenen Vorschuss auf die Aufwendungen zu verlangen (§ 669 BGB). Über die Aufwendungen ist dem Auftraggehr im Rahmen der Rechenschaftslegung nach § 666 BGB Nachweis zu führen. Reisekosten werden nach {{travel_cost_regulation}} abgerechnet.",
      "content_en": "The Agent shall receive remuneration of {{mandate_fee}} EUR (net plus statutory VAT). The remuneration is due {{fee_due_date}}. If the activity is customarily expected only for remuneration, compensation is deemed tacitly agreed pursuant to § 612 BGB. Pursuant to § 670 BGB, the Principal is obligated to reimburse the Agent for expenses incurred in the execution of the mandate, provided the Agent could deem them necessary under the circumstances. Expenses include in particular: {{reimbursable_expenses}}. The Agent is entitled to demand a reasonable advance on expenses (§ 669 BGB). Evidence of expenses shall be provided to the Principal as part of the accounting pursuant to § 666 BGB. Travel costs are settled according to {{travel_cost_regulation}}.",
      "fields": [
        {
          "key": "mandate_fee",
          "label_de": "Vergütung netto (EUR)",
          "label_en": "Fee Net (EUR)",
          "type": "text",
          "required": false
        },
        {
          "key": "fee_due_date",
          "label_de": "Fälligkeit der Vergütung",
          "label_en": "Fee Due Date",
          "type": "select",
          "required": false,
          "options": [
            "nach Abschluss des Auftrags",
            "monatlich nach erbrachter Leistung",
            "nach Meilensteinen",
            "sofort nach Rechnungsstellung"
          ]
        },
        {
          "key": "reimbursable_expenses",
          "label_de": "Erstattungsfähige Aufwendungen",
          "label_en": "Reimbursable Expenses",
          "type": "textarea",
          "required": false
        },
        {
          "key": "travel_cost_regulation",
          "label_de": "Reisekostenregelung",
          "label_en": "Travel Cost Regulation",
          "type": "select",
          "required": false,
          "options": [
            "Bundesreisekostengesetz (BRKG)",
            "Pauschale pro km",
            "tatsächliche Kosten gegen Nachweis",
            "nicht erstattungsfähig"
          ]
        }
      ]
    },
    {
      "title_de": "Herausgabepflicht",
      "title_en": "Obligation to Return",
      "content_de": "Der Beauftragte ist gemäß § 667 BGB verpflichtet, dem Auftraggeber alles, was er zur Ausführung des Auftrags erhält und aus der Geschäftsbesorgung erlangt, herauszugeben. Dies umfasst insbesondere alle erhaltenen Dokumente, Unterlagen, Zahlungen, Wertpapiere und sonstigen Gegenstände sowie alle Früchte und Nutzungen aus der Geschäftsbesorgung. Der Beauftragte hat über erhaltene Gelder gemäß § 666 BGB Rechnung zu legen und diese getrennt von seinem eigenen Vermögen zu verwahren. Der Beauftragte hat Geld, das er für den Auftraggeber empfangen hat, zu dem für die Verwaltung fremder Gelder üblichen Zinssatz zu verzinsen (§ 668 BGB). Die Herausgabe erfolgt unverzüglich nach Aufforderung durch den Auftraggeber oder spätestens bei Beendigung des Auftrags.",
      "content_en": "Pursuant to § 667 BGB, the Agent is obligated to surrender to the Principal everything received for the execution of the mandate and obtained from the handling of the matter. This includes in particular all received documents, files, payments, securities and other items as well as all fruits and benefits from the business management. The Agent shall account for funds received pursuant to § 666 BGB and keep them separate from the Agent's own assets. The Agent shall pay interest on money received for the Principal at the customary rate for the management of third-party funds (§ 668 BGB). Surrender shall occur immediately upon request by the Principal or no later than upon termination of the mandate.",
      "fields": []
    },
    {
      "title_de": "Beendigung",
      "title_en": "Termination",
      "content_de": "Der Auftrag endet mit seiner Erledigung, durch Widerruf des Auftraggebers oder durch Kündigung des Beauftragten gemäß § 671 BGB. Der Auftraggeber kann den Auftrag jederzeit widerrufen. Der Beauftragte kann den Auftrag jederzeit kündigen, jedoch nur in der Art, dass der Auftraggeber für die Besorgung des Geschäfts anderweitig Fürsorge treffen kann, es sei denn, ein wichtiger Grund liegt vor. Die Kündigungsfrist beträgt {{termination_notice}}. Bei einem Widerruf oder einer Kündigung ohne wichtigen Grund hat der Beauftragte Anspruch auf einen angemessenen Teil der Vergütung entsprechend dem bis dahin erreichten Stand der Auftragsdurchführung sowie auf Ersatz der bis dahin entstandenen Aufwendungen. Bei Tod des Beauftragten erlischt der Auftrag gemäß § 673 BGB, sofern nichts anderes vereinbart ist. Bei Tod des Auftraggebers gilt § 672 BGB.",
      "content_en": "The mandate ends upon its completion, by revocation by the Principal or by termination by the Agent pursuant to § 671 BGB. The Principal may revoke the mandate at any time. The Agent may terminate the mandate at any time, but only in such a way that the Principal can make other arrangements for the handling of the matter, unless good cause exists. The notice period is {{termination_notice}}. In the event of revocation or termination without good cause, the Agent is entitled to an appropriate portion of the fee corresponding to the status of mandate execution achieved up to that point, as well as reimbursement of expenses incurred up to that point. Upon the death of the Agent, the mandate lapses pursuant to § 673 BGB, unless otherwise agreed. Upon the death of the Principal, § 672 BGB applies.",
      "fields": [
        {
          "key": "termination_notice",
          "label_de": "Kündigungsfrist",
          "label_en": "Notice Period",
          "type": "select",
          "required": false,
          "options": [
            "jederzeit (§ 671 BGB)",
            "2 Wochen",
            "1 Monat zum Monatsende",
            "3 Monate zum Quartalsende"
          ]
        }
      ]
    },
    {
      "title_de": "Haftung",
      "title_en": "Liability",
      "content_de": "Der Beauftragte haftet für Schäden, die durch vorsätzliche oder grob fahrlässige Pflichtverletzung entstehen, unbeschränkt. Für leichte Fahrlässigkeit haftet der Beauftragte nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten); in diesem Fall ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt, höchstens jedoch auf {{agent_liability_cap}} EUR. Vorstehende Haftungsbeschränkungen gelten nicht bei Verletzung von Leben, Körper oder Gesundheit, bei arglistig verschwiegenen Mängeln oder bei Übernahme einer Garantie. Der Auftraggeber haftet dem Beauftragten für Schäden, die durch pflichtwidriges Verhalten des Auftraggebers oder durch Mängel der vom Auftraggeber bereitgestellten Informationen oder Materialien entstehen. Der Beauftragte haftet für das Verschulden von eingeschalteten Hilfspersonen und Subunternehmern wie für eigenes Verschulden (§ 278 BGB). Ansprüche des Auftraggebers verjähren innerhalb der gesetzlichen Verjährungsfrist von drei Jahren, beginnend mit dem Schluss des Jahres, in dem der Anspruch entstanden ist und der Auftraggeber von den anspruchsbegründenden Umständen Kenntnis erlangt hat oder ohne grobe Fahrlässigkeit erlangen müsste.",
      "content_en": "The Agent is liable without limitation for damages caused by intentional or grossly negligent breach of duty. For slight negligence, the Agent is liable only for breach of essential contractual obligations (cardinal obligations); in this case, liability is limited to the foreseeable, contract-typical damage, but no more than {{agent_liability_cap}} EUR. The foregoing limitations of liability do not apply to injury to life, body or health, fraudulently concealed defects, or assumption of a guarantee. The Principal is liable to the Agent for damages caused by culpable conduct of the Principal or defects in the information or materials provided by the Principal. The Agent is liable for the fault of assistants and subcontractors as for its own fault (§ 278 BGB). Claims of the Principal become statute-barred within the statutory limitation period of three years, commencing at the end of the year in which the claim arose and the Principal obtained knowledge of the circumstances giving rise to the claim or should have obtained such knowledge without gross negligence.",
      "fields": [
        {
          "key": "agent_liability_cap",
          "label_de": "Haftungsobergrenze Beauftragter (EUR)",
          "label_en": "Agent Liability Cap (EUR)",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "title_de": "Datenschutz und Vertraulichkeit",
      "title_en": "Data Protection and Confidentiality",
      "content_de": "Der Beauftragte verpflichtet sich, die Bestimmungen der Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes (BDSG) einzuhalten, soweit er im Rahmen des Auftrags Zugang zu personenbezogenen Daten erhält. Sofern der Beauftragte personenbezogene Daten im Auftrag des Auftraggebers verarbeitet, schließen die Parteien eine gesonderte Vereinbarung zur Auftragsverarbeitung gemäß Art. 28 DSGVO. Der Beauftragte verpflichtet sich, über alle im Rahmen des Auftrags bekannt gewordenen vertraulichen Informationen des Auftraggebers Stillschweigen zu bewahren. Diese Verpflichtung gilt auch über die Beendigung des Auftrags hinaus für einen Zeitraum von {{agent_confidentiality_years}} Jahren. Der Beauftragte stellt sicher, dass seine Mitarbeiter und Subunternehmer ebenfalls zur Vertraulichkeit verpflichtet werden. Der Beauftragte darf durch den Auftraggeber überlassene Unterlagen, Daten und Informationen weder kopieren noch an Dritte weitergeben oder für eigene Zwecke nutzen.",
      "content_en": "The Agent undertakes to comply with the provisions of the General Data Protection Regulation (GDPR) and the Federal Data Protection Act (BDSG) insofar as the Agent obtains access to personal data in the course of the mandate. If the Agent processes personal data on behalf of the Principal, the parties shall conclude a separate data processing agreement pursuant to Art. 28 GDPR. The Agent undertakes to maintain confidentiality regarding all confidential information of the Principal that becomes known in the course of the mandate. This obligation also applies beyond termination of the mandate for a period of {{agent_confidentiality_years}} years. The Agent ensures that its employees and subcontractors are also bound to confidentiality. The Agent shall not copy, pass on to third parties or use for its own purposes any documents, data and information provided by the Principal.",
      "fields": [
        {
          "key": "agent_confidentiality_years",
          "label_de": "Vertraulichkeitsdauer über Auftragsende hinaus (Jahre)",
          "label_en": "Confidentiality Period Beyond Mandate End (Years)",
          "type": "text",
          "required": false
        },
        {
          "key": "agent_dpa_required",
          "label_de": "Auftragsverarbeitungsvereinbarung erforderlich",
          "label_en": "Data Processing Agreement Required",
          "type": "select",
          "required": false,
          "options": [
            "ja",
            "nein",
            "wird geprüft"
          ]
        }
      ]
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court_mandate}}. Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Anstelle der unwirksamen Bestimmung gilt eine wirksame Regelung, die dem wirtschaftlich Gewollten möglichst nahekommt. Änderungen und Ergänzungen bedürfen der Schriftform; dies gilt auch für die Aufhebung dieses Schriftformerfordernisses. Der Auftraggeber erteilt dem Beauftragten die erforderliche Vollmacht zur Vornahme der Rechtshandlungen, die zur Durchführung des Auftrags erforderlich sind, soweit eine Vertretung erforderlich ist. Der Umfang der Vollmacht ergibt sich aus der Anlage zu diesem Vertrag. Ort: {{place_mandate}}, Datum: {{date_mandate}}.",
      "content_en": "Place of jurisdiction is {{court_mandate}}. The law of the Federal Republic of Germany applies. Should any provision of this contract be or become invalid, the remainder of the contract shall remain effective. In place of the invalid provision, a valid provision shall apply that comes as close as possible to the economic intent. Amendments and supplements require written form; this also applies to the waiver of this written form requirement. The Principal grants the Agent the necessary power of attorney to perform the legal acts required for the execution of the mandate, insofar as representation is necessary. The scope of the power of attorney is set out in the appendix to this contract. Place: {{place_mandate}}, Date: {{date_mandate}}.",
      "fields": [
        {
          "key": "court_mandate",
          "label_de": "Gerichtsstand",
          "label_en": "Place of Jurisdiction",
          "type": "text",
          "required": false
        },
        {
          "key": "place_mandate",
          "label_de": "Ort der Vertragsunterzeichnung",
          "label_en": "Place of Signing",
          "type": "text",
          "required": false
        },
        {
          "key": "date_mandate",
          "label_de": "Datum der Vertragsunterzeichnung",
          "label_en": "Date of Signing",
          "type": "date",
          "required": false
        }
      ]
    }
  ],
  "fileData": null,
  "fileName": null,
  "createdAt": "2026-05-31T00:00:00.000Z"
}

];
