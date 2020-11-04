---
title: "[Laravel] Create a simple laravel search with trait"

date: "2020-11-04"

published: true

tags:

- php

- laravel
---

Chúng ta khi làm việc với Laravel ít nhất vài lần sẽ gặp một task yêu cầu làm công việc tìm kiếm thông tin dựa vào 1 chuỗi đầu vào. Thường thì chúng ta sẽ viết đi viết lại 1 câu điều kiện để thực hiện tìm kiếm hoặc sử dụng một thư viện nào đó để làm công việc đó.

Sau một thời gian copy và patse những câu lệnh where, tôi đã nghĩ ra cách để đơn giản hoá công việc tìm kiếm và có thể tái sử dụng nhiều lần. Chúng ta sẽ tìm hiểu ngay bên dưới.

## 1.  Bắt đầu

#### 1. Khởi tạo trait
- Tạo thư mục "App\Traits"
- Tạo file SearchTrait.php trong thử mục "App\Traits" với nội dung:
```php
<?php
namespace App\Traits;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Schema;
use Arr;
trait  SearchTrait
{
```

#### 2. Định nghĩa những hàm để thực hiện việc tìm kiếm
- Lấy điều kiện join khi search được define trong model và khởi tạo scope để join với những bảng liên quan:
```php
    <?php

    public function getJoins()
    {
      return  Arr::get($this->searchable, 'joins', []);
    }
    public function scopeMakeJoins(Builder $query)
    {
      foreach ($this->getJoins() as $table => $keys) {
        $query->leftJoin($table, function ($join) use ($keys) {
          $join->on($keys[0], '=', $keys[1]);
        });
      }
    }
```

- Lấy những trường sẽ sẽ được tìm kiếm dựa vào định nghĩa ở model:
```php

    public function getSearchFields()
    {
      $model = $this;
      $fields = Arr::get($model->searchable, 'columns', []);
      if (empty($fields)) {
        $fields = Schema::getColumnListing($model->getTable());
        $others[] = $model->primaryKey;
        $others[] = $model->getUpdatedAtColumn() ?: 'created_at';
        $others[] = $model->getCreatedAtColumn() ?: 'updated_at';
        $others[] = method_exists($model, 'getDeletedAtColumn')
        ? $model->getDeletedAtColumn()
        : 'deleted_at';
        $fields = array_diff($fields, $model->getHidden(), $others);
      }
      return $fields;
    }
```
  - Định nghĩa scope dùng để tìm kiếm, ở đây có 2 trường hợp (Tìm kiếm trên bảng hiện tại và những bảng quan hệ hoặc chỉ tìm kiếm trên bảng hiện tại):
  
  1: Tìm kiếm trên bảng hiện tại và những bảng quan hệ:
  ```php

        public function scopeSearch($query, $keyword, $matchAllFields = false)
        {
          if (empty($keyword)) {
            return  $query;
          }

          $query = $query->makeJoins();
          $query = $query->select($this->getTable() .  '.*')->distinct();
          $query = $query->where(function ($query) use ($keyword, $matchAllFields) {
            $keyword = preg_replace('/\s+/', '%', $keyword);
            foreach ($this->getSearchFields() as $field) {
              if ($matchAllFields) {
                $query->where($field, 'LIKE', "%$keyword%");
              } else 
                $query->orWhere($field, 'LIKE', "%$keyword%");
              }
            }
          });

          return $query;
        }
  ```
  2: Chỉ tìm kiếm trên bảng hiện tại (No Relation):
  ```php

        public function scopeSearchNoRelation($query, $keyword, $matchAllFields = false)
        {
          if (empty($keyword)) {
            return  $query;
          }

          $query = $query->where(function ($query) use ($keyword, $matchAllFields) {
            $keyword = preg_replace('/\s+/', '%', $keyword);
            foreach ($this->getSearchFields() as $field) {
              if ($matchAllFields) {
                $query->where($field, 'LIKE', "%$keyword%");
              } else 
                $query->orWhere($field, 'LIKE', "%$keyword%");
              }
            }
          });

          return $query;
        }
  ```

#### 3.  Đầy đủ
```php
namespace  App\Traits;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Schema;
use  Arr;

trait  SearchTrait
{
	public function getJoins()
	{
		return  Arr::get($this->searchable, 'joins', []);
	}

	public function scopeMakeJoins(Builder $query)
	{
		foreach ($this->getJoins() as $table => $keys) {
			$query->leftJoin($table, function ($join) use ($keys) {
				$join->on($keys[0], '=', $keys[1]);
			});
		}
	}
	
	public function getSearchFields()
	{
		$model = $this;
		$fields = Arr::get($model->searchable, 'columns', []);
		if (empty($fields)) {
			$fields = Schema::getColumnListing($model->getTable());
			$others[] = $model->primaryKey;
			$others[] = $model->getUpdatedAtColumn() ?: 'created_at';
			$others[] = $model->getCreatedAtColumn() ?: 'updated_at';
			$others[] = method_exists($model, 'getDeletedAtColumn')
			? $model->getDeletedAtColumn()
			: 'deleted_at';
			$fields = array_diff($fields, $model->getHidden(), $others);
		}
		return $fields;
	}

	public function scopeSearch($query, $keyword, $matchAllFields = false)
	{
		if (empty($keyword)) {
			return  $query;
		}
		$query = $query->makeJoins();
		$query = $query->select($this->getTable() .  '.*')->distinct();
		$query = $query->where(function ($query) use ($keyword, $matchAllFields) {
			$keyword = preg_replace('/\s+/', '%', $keyword);
			foreach ($this->getSearchFields() as $field) {
				if ($matchAllFields) {
					$query->where($field, 'LIKE', "%$keyword%");
				} else 
					$query->orWhere($field, 'LIKE', "%$keyword%");
				}
			}
		});
		return $query;
	}

	public function scopeSearchNoRelation($query, $keyword, $matchAllFields = false)
	{
		if (empty($keyword)) {
			return  $query;
		}
		$query = $query->where(function ($query) use ($keyword, $matchAllFields) {
			$keyword = preg_replace('/\s+/', '%', $keyword);
			foreach ($this->getSearchFields() as $field) {
				if ($matchAllFields) {
					$query->where($field, 'LIKE', "%$keyword%");
				} else 
					$query->orWhere($field, 'LIKE', "%$keyword%");
				}
			}
		});
		return $query;
	}
}
```

## II. Cách sử dụng

**_1. Trong model:_**
```<php?
namespace  App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Traits\SearchTrait;

class Product extends Model
{
	use SearchTrait;
	
	protected $searchable = [
		'columns' => [
			'products.name', 'categories.name', 'users.name'
		],
		'joins' => [
			'category' => ['products.category_id', 'categories.id'],
			'user' => ['products.user_id', 'users.id']
		]
	];
```  
- **columns** : Những cột sẽ được thực hiện tìm kiếm.
- **joins**: Những bảng quan hệ và điều kiện để nối bảng.

**_2. Trong Controller:_**
```php
namespace  App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
	public function index(Request $request)
	{
		$keywork = $request->get('keywork');
		$products = Product::search($keywork, false);
		return view('products.index', compact('products'))
	}
{
```
- Ở đây tham số thứ 2 của hàm search()
- $matchAllFields: Nếu **true** thì tất cả các trường tìm kiếm đều phải chứa giá trị **keywork** và ngược lại chỉ cần một trong các trường chứa **keywork**.

## III. Kết luận
Như vậy, trong blog này chúng ta đã có một cách thực hiện công việc tìm kiếm một cách đơn giản và dễ tái sử dụng bằng cách sử dụng **Trait** trong Laravel. Mong là bài chia sẽ này sẽ giúp được mọi người trong công việc của mình.

###### *<div style="text-align: right"> - by  Trần Văn Tuấn Anh </div>*