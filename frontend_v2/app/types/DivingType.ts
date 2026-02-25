export interface DivingType {
    label: string;
    token: string;
}

export interface DivingEnvironment {
    label: string;
    token: string;
}

export const DIVING_TYPES: DivingType[] = [
    { label: 'Discovery', token: 'discovery' },
    { label: 'Training', token: 'training' },
    { label: 'Recreational', token: 'recreational' },
    { label: 'Technical', token: 'technical' },
    { label: 'Cave', token: 'cave' },
    { label: 'Wreck', token: 'wreck' },
    { label: 'Night', token: 'night' },
    { label: 'Deep', token: 'deep' },
    { label: 'Drift', token: 'drift' },
    { label: 'Ice', token: 'ice' },
    { label: 'Photography', token: 'photography' },
];

export const DIVING_ENVIRONMENTS: DivingEnvironment[] = [
    { label: 'Sea', token: 'sea' },
    { label: 'Lake', token: 'lake' },
    { label: 'River', token: 'river' },
    { label: 'Pool', token: 'pool' },
    { label: 'Cenote', token: 'cenote' },
    { label: 'Quarry', token: 'quarry' },
];
