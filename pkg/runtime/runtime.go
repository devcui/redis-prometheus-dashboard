/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-19 10:27:41
 * @LastEditTime: 2020-11-19 10:56:45
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/pkg/runtime/runtime.go
 * @LICENSE: Apache-2.0
 */

package runtime

import (
	"github.com/emicklei/go-restful"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

const (
	ApiRootPath = "/kapis"
)

// container holds all webservice of apiserver
var Container = restful.NewContainer()

type ContainerBuilder []func(c *restful.Container) error

const MimeMergePatchJson = "application/merge-patch+json"
const MimeJsonPatchJson = "application/json-patch+json"

func init() {
	restful.RegisterEntityAccessor(MimeMergePatchJson, restful.NewEntityAccessorJSON(restful.MIME_JSON))
	restful.RegisterEntityAccessor(MimeJsonPatchJson, restful.NewEntityAccessorJSON(restful.MIME_JSON))
}

func NewWebService(gv schema.GroupVersion) *restful.WebService {
	webservice := restful.WebService{}
	webservice.Path(ApiRootPath + "/" + gv.String()).
		Consumes(restful.MIME_JSON).
		Produces(restful.MIME_JSON)

	return &webservice
}

func (cb *ContainerBuilder) AddToContainer(c *restful.Container) error {
	for _, f := range *cb {
		if err := f(c); err != nil {
			return err
		}
	}
	return nil
}

func (cb *ContainerBuilder) Register(funcs ...func(*restful.Container) error) {
	for _, f := range funcs {
		*cb = append(*cb, f)
	}
}

func NewContainerBuilder(funcs ...func(*restful.Container) error) ContainerBuilder {
	var cb ContainerBuilder
	cb.Register(funcs...)

	return cb
}
