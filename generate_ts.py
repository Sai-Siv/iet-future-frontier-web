import json
import re

with open('awards_schema.json', 'r', encoding='utf-8') as f:
    sections = json.load(f)

general = sections[0]['questions']
student_sections = sections[2:9]
prof_sections = sections[10:17]

def clean_str(s):
    if s is None: return ''
    return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').strip()

ts_code = """export type QuestionType = 'Short Answer' | 'Paragraph' | 'Multiple Choice' | 'Dropdown' | 'Checkboxes' | 'File Upload';

export interface Option {
  value: string;
}

export interface Question {
  id: number | string;
  title: string;
  type: QuestionType;
  required: boolean;
  options?: Option[];
}

export interface AwardCategory {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const generalInformation: Question[] = [
"""
for q in general:
    options_str = ''
    if 'options' in q and q['options']:
        options_list = ', '.join([f'{{ value: "{clean_str(opt["value"])}" }}' for opt in q['options']])
        options_str = f', options: [{options_list}]'
    req = 'true' if q.get('required') else 'false'
    ts_code += f"  {{ id: {q['id']}, title: \"{clean_str(q['title'])}\", type: '{q['type']}', required: {req}{options_str} }},\n"
ts_code += "];\n\n"

ts_code += "export const studentAwards: AwardCategory[] = [\n"
for s in student_sections:
    s_id = re.sub(r'[^a-zA-Z0-9]', '', s['title'])
    ts_code += f"  {{\n    id: '{s_id}',\n    title: \"{clean_str(s['title'])}\",\n    description: \"{clean_str(s['description'])}\",\n    questions: [\n"
    for q in s['questions']:
        options_str = ''
        if 'options' in q and q['options']:
            options_list = ', '.join([f'{{ value: "{clean_str(opt["value"])}" }}' for opt in q['options']])
            options_str = f', options: [{options_list}]'
        req = 'true' if q.get('required') else 'false'
        ts_code += f"      {{ id: {q['id']}, title: \"{clean_str(q['title'])}\", type: '{q['type']}', required: {req}{options_str} }},\n"
    ts_code += "    ]\n  },\n"
ts_code += "];\n\n"

ts_code += "export const professionalAwards: AwardCategory[] = [\n"
for s in prof_sections:
    s_id = re.sub(r'[^a-zA-Z0-9]', '', s['title'])
    ts_code += f"  {{\n    id: '{s_id}',\n    title: \"{clean_str(s['title'])}\",\n    description: \"{clean_str(s['description'])}\",\n    questions: [\n"
    for q in s['questions']:
        options_str = ''
        if 'options' in q and q['options']:
            options_list = ', '.join([f'{{ value: "{clean_str(opt["value"])}" }}' for opt in q['options']])
            options_str = f', options: [{options_list}]'
        req = 'true' if q.get('required') else 'false'
        ts_code += f"      {{ id: {q['id']}, title: \"{clean_str(q['title'])}\", type: '{q['type']}', required: {req}{options_str} }},\n"
    ts_code += "    ]\n  },\n"
ts_code += "];\n"

with open('src/data/awardsData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)
