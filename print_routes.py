import sys
sys.path.append(r'c:\Users\user\Downloads\Botvault')
import api_app
rules = sorted(api_app.app.url_map.iter_rules(), key=lambda x: x.rule)
for r in rules:
    print(r.rule, list(r.methods))
